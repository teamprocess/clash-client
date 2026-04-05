const normalizeEscapedLineBreaks = (content: string) => {
  if (content.includes("\n")) {
    return content;
  }

  return content.includes("\\n") ? content.replace(/\\n/g, "\n") : content;
};

const dedentContent = (content: string) => {
  const lines = content.split("\n");
  const indentSizes = lines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^[ \t]*/)?.[0].length ?? 0);

  if (indentSizes.length === 0) {
    return content;
  }

  const minIndent = Math.min(...indentSizes);
  if (minIndent === 0) {
    return content;
  }

  return lines.map(line => line.slice(minIndent)).join("\n");
};

export const normalizeAnnouncementMarkdown = (content: string) => {
  const normalizedLineBreaks = normalizeEscapedLineBreaks(content)
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  return dedentContent(normalizedLineBreaks).trim();
};
