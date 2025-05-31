import * as vscode from 'vscode';
import { extractTagName } from './tagUtils';

export function shouldInsertClosingTag(line: string, cursorPos: number): string | null {
  const lineUpToCursor = line.substring(0, cursorPos);
  const tagName = extractTagName(lineUpToCursor);
  return tagName;
}

export function insertClosingTag(tagName: string, position: vscode.Position): Thenable<boolean> {
  const snippet = new vscode.SnippetString(`</${tagName}>`);
  const editor = vscode.window.activeTextEditor;
  return editor?.insertSnippet(snippet, position) ?? Promise.resolve(false);
}
