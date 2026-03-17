import { CSSProperties, ReactNode } from "react";
import { font } from "@clash/design-tokens/font";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled, { css, useTheme } from "styled-components";

type MarkdownCodeContentVariant = "question" | "body";

interface MarkdownCodeContentProps {
  content: string;
  variant?: MarkdownCodeContentVariant;
  prefix?: ReactNode;
}

type ContentSegment =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "code";
      code: string;
      language?: string;
    };

const CODE_BLOCK_PATTERN = /```([^\s`]+)?[ \t]*\n?([\s\S]*?)```/g;

const LANGUAGE_ALIASES: Record<string, string> = {
  c: "c",
  cpp: "cpp",
  cxx: "cpp",
  "c++": "cpp",
  cs: "csharp",
  "c#": "csharp",
  html: "markup",
  js: "javascript",
  java: "java",
  jsx: "jsx",
  kt: "kotlin",
  py: "python",
  rs: "rust",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  tsx: "tsx",
  xml: "markup",
  yml: "yaml",
  zsh: "bash",
};

const normalizeContent = (content: string) => content.replace(/\r\n/g, "\n");

const toParagraphs = (content: string) =>
  content
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

const resolveLanguage = (language?: string) => {
  if (!language) return "text";

  const normalizedLanguage = language.trim().toLowerCase();
  return LANGUAGE_ALIASES[normalizedLanguage] ?? normalizedLanguage;
};

const formatLanguageLabel = (language?: string) => {
  if (!language) return "code";
  return language.trim().toLowerCase();
};

const parseContentSegments = (content: string): ContentSegment[] => {
  const normalizedContent = normalizeContent(content);
  const segments: ContentSegment[] = [];
  let lastIndex = 0;

  for (const match of normalizedContent.matchAll(CODE_BLOCK_PATTERN)) {
    const startIndex = match.index ?? 0;
    const rawText = normalizedContent.slice(lastIndex, startIndex).trim();

    if (rawText) {
      segments.push({
        type: "text",
        content: rawText,
      });
    }

    const rawLanguage = match[1]?.trim();
    const rawCode = match[2]?.replace(/^\n+/, "").replace(/\n+$/, "");

    if (rawCode) {
      segments.push({
        type: "code",
        code: rawCode,
        language: rawLanguage,
      });
    }

    lastIndex = startIndex + match[0].length;
  }

  const trailingText = normalizedContent.slice(lastIndex).trim();
  if (trailingText) {
    segments.push({
      type: "text",
      content: trailingText,
    });
  }

  if (segments.length > 0) {
    return segments;
  }

  if (normalizedContent.trim()) {
    return [
      {
        type: "text",
        content: normalizedContent.trim(),
      },
    ];
  }

  return [];
};

const ContentRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.9rem;
  min-width: 0;
`;

const textVariantStyles = {
  question: css`
    ${font.headline1.medium}
    text-align: center;
    line-height: 1.45;
  `,
  body: css`
    ${font.headline2.regular}
    text-align: left;
    line-height: 1.55;
  `,
};

const TextBlock = styled.p<{ $variant: MarkdownCodeContentVariant }>`
  margin: 0;
  color: ${({ theme }) => theme.label.normal};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  min-width: 0;

  ${({ $variant }) => textVariantStyles[$variant]}
`;

const PrefixSlot = styled.span`
  display: inline;
  margin-right: 0.35rem;
`;

const CodeBlockFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  border-radius: 0.9rem;
  border: 1px solid ${({ theme }) => theme.line.alternative};
  background: ${({ theme }) => theme.background.alternative};
  overflow: hidden;
`;

const CodeBlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2rem;
  padding: 0.55rem 0.85rem;
  background: ${({ theme }) => theme.fill.neutral};
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const MarkdownCodeContent = ({
  content,
  variant = "body",
  prefix,
}: MarkdownCodeContentProps) => {
  const theme = useTheme();
  const segments = parseContentSegments(content);
  const isLightTheme = theme.background.normal === "#ffffff";
  const syntaxTheme = isLightTheme ? oneLight : oneDark;

  const customCodeStyle: CSSProperties = {
    margin: 0,
    padding: "1rem",
    background: isLightTheme ? theme.background.neutral : "#1d1f21",
    fontSize: "0.8rem",
    lineHeight: 1.6,
    overflowX: "auto",
  };

  const renderedNodes: ReactNode[] = [];
  let hasRenderedPrefix = false;

  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
    const segment = segments[segmentIndex];

    if (segment.type === "text") {
      const paragraphs = toParagraphs(segment.content);

      for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
        const paragraph = paragraphs[paragraphIndex];
        const shouldRenderPrefix = Boolean(prefix) && !hasRenderedPrefix && paragraphIndex === 0;

        if (shouldRenderPrefix) {
          hasRenderedPrefix = true;
        }

        renderedNodes.push(
          <TextBlock key={`text-${segmentIndex}-${paragraphIndex}`} $variant={variant}>
            {shouldRenderPrefix ? <PrefixSlot>{prefix}</PrefixSlot> : null}
            {paragraph}
          </TextBlock>
        );
      }

      continue;
    }

    renderedNodes.push(
      <CodeBlockFrame key={`code-${segmentIndex}`}>
        <CodeBlockHeader>{formatLanguageLabel(segment.language)}</CodeBlockHeader>
        <SyntaxHighlighter
          language={resolveLanguage(segment.language)}
          style={syntaxTheme}
          customStyle={customCodeStyle}
          wrapLongLines={false}
          showLineNumbers={false}
          PreTag="div"
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            },
          }}
        >
          {segment.code}
        </SyntaxHighlighter>
      </CodeBlockFrame>
    );
  }

  if (prefix && !hasRenderedPrefix) {
    renderedNodes.unshift(
      <TextBlock key="prefix-only" $variant={variant}>
        <PrefixSlot>{prefix}</PrefixSlot>
      </TextBlock>
    );
  }

  return <ContentRoot>{renderedNodes}</ContentRoot>;
};
