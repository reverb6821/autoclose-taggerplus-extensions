export function extractTagName(lineText: string): string | null {
  // Prova a catturare il tag che termina con >
  const match = lineText.match(/<([a-zA-Z][\w:-]*)\b[^<>]*?>$/);
  if (!match) return null;

  // Escludi tag che finiscono con />
  if (lineText.trim().endsWith('/>')) return null;

  return match[1];
}