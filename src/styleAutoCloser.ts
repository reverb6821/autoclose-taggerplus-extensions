import * as vscode from 'vscode';

export function shouldInsertBraceBlock(char: string): boolean {
  return char === '{';
}

export function insertBraceBlock(position: vscode.Position): Thenable<boolean> {
  const snippet = new vscode.SnippetString('\n\t$0\n}');
  const editor = vscode.window.activeTextEditor;
  return editor?.insertSnippet(snippet, position) ?? Promise.resolve(false);
}
