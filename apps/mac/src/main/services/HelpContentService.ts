import { BrowserWindow, app } from "electron";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  HELP_CONTENT_KEYS,
  fallbackHelpContents,
  isHelpContentKey,
  type HelpContentKey,
} from "../../shared/helpContent";

interface CachedHelpContent {
  content: string;
  etag: string;
}

type HelpContentCache = Partial<Record<HelpContentKey, CachedHelpContent>>;

interface CachedHelpContentFile {
  contents: HelpContentCache;
}

export class HelpContentService {
  private cache: HelpContentCache = {};

  async initialize() {
    try {
      const cacheFile = await readFile(this.getCachePath(), "utf8");
      this.cache = this.parseCache(cacheFile);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.warn("도움말 캐시를 읽지 못했습니다.", error);
      }
    }
  }

  getContent(key: HelpContentKey) {
    return this.cache[key]?.content ?? fallbackHelpContents[key];
  }

  async refreshAll() {
    if (!process.env.VITE_API_URL) {
      return;
    }

    const updates = await Promise.all(
      HELP_CONTENT_KEYS.map(key =>
        this.fetchContent(key).catch(error => {
          console.warn(`도움말을 갱신하지 못했습니다. key=${key}`, error);
          return null;
        })
      )
    );
    const changedContents = updates.filter(
      (update): update is { key: HelpContentKey; content: CachedHelpContent } => update !== null
    );

    if (changedContents.length === 0) {
      return;
    }

    const nextCache = { ...this.cache };
    changedContents.forEach(({ key, content }) => {
      nextCache[key] = content;
    });

    try {
      await this.persistCache(nextCache);
    } catch (error) {
      console.warn("도움말 캐시를 저장하지 못했습니다.", error);
      return;
    }

    this.cache = nextCache;

    changedContents.forEach(({ key, content }) => {
      BrowserWindow.getAllWindows().forEach(window => {
        if (!window.isDestroyed()) {
          window.webContents.send("help-content:updated", { key, content: content.content });
        }
      });
    });
  }

  private async fetchContent(key: HelpContentKey) {
    const apiUrl = process.env.VITE_API_URL?.replace(/\/$/, "");
    if (!apiUrl) {
      return null;
    }

    const cachedContent = this.cache[key];
    const response = await fetch(`${apiUrl}/help-contents/${encodeURIComponent(key)}`, {
      headers: {
        Accept: "text/plain",
        ...(cachedContent ? { "If-None-Match": cachedContent.etag } : {}),
      },
      signal: AbortSignal.timeout(5_000),
    });

    if (response.status === 304) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`status=${response.status}`);
    }

    const content = await response.text();
    const etag = response.headers.get("etag");
    if (!content || !etag) {
      throw new Error("도움말 응답에 content 또는 ETag가 없습니다.");
    }

    return { key, content: { content, etag } };
  }

  private getCachePath() {
    return join(app.getPath("userData"), "help-contents.json");
  }

  private parseCache(value: string): HelpContentCache {
    const parsed = JSON.parse(value) as CachedHelpContentFile;
    const contents = parsed?.contents;
    if (!contents || typeof contents !== "object") {
      return {};
    }

    return Object.entries(contents).reduce<HelpContentCache>((cache, [key, content]) => {
      if (
        isHelpContentKey(key) &&
        typeof content?.content === "string" &&
        content.content.length > 0 &&
        typeof content.etag === "string" &&
        content.etag.length > 0
      ) {
        cache[key] = content;
      }
      return cache;
    }, {});
  }

  private async persistCache(contents: HelpContentCache) {
    const cachePath = this.getCachePath();
    const temporaryPath = `${cachePath}.tmp`;
    await mkdir(app.getPath("userData"), { recursive: true });
    await writeFile(temporaryPath, JSON.stringify({ contents }), "utf8");
    await rename(temporaryPath, cachePath);
  }
}
