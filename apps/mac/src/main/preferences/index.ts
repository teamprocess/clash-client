import { app } from "electron";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

export interface AppPreferences {
  zoomFactor?: number;
}

const PREFERENCES_FILE_NAME = "preferences.json";

const getPreferencesPath = () => join(app.getPath("userData"), PREFERENCES_FILE_NAME);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readPreferences = (): AppPreferences => {
  try {
    const rawPreferences = readFileSync(getPreferencesPath(), "utf8");
    const parsedPreferences: unknown = JSON.parse(rawPreferences);

    if (!isObject(parsedPreferences)) {
      return {};
    }

    return parsedPreferences;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code !== "ENOENT") {
      console.error("앱 설정을 불러오지 못했습니다:", error);
    }

    return {};
  }
};

export const getAppPreferences = () => readPreferences();

export const updateAppPreferences = (partialPreferences: AppPreferences) => {
  try {
    const preferencesPath = getPreferencesPath();
    const nextPreferences = {
      ...readPreferences(),
      ...partialPreferences,
    };

    mkdirSync(dirname(preferencesPath), { recursive: true });
    writeFileSync(preferencesPath, JSON.stringify(nextPreferences, null, 2));
  } catch (error) {
    console.error("앱 설정을 저장하지 못했습니다:", error);
  }
};
