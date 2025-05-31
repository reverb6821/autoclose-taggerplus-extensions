import * as vscode from 'vscode';
// import { extractTagName } from './tagUtils';
import * as htmlAutoCloser from './htmlAutoCloser';
import * as styleAutoCloser from './styleAutoCloser';

const selfClosingTags = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
  'input', 'link', 'meta', 'source', 'track', 'wbr'
]);

const supportedHtmlLikeLanguages = [
  'html', 'vue', 'astro', 'javascriptreact', 'typescriptreact',
  'xml', 'svelte', 'xaml'
];

const supportedStyleLanguages = [
  'css', 'scss', 'less'
];

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('autoCloseTags');
  const excludedTags = new Set(config.get<string[]>('excludedTags') || []);

  const autoCloseTag = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document || event.contentChanges.length === 0) return;
    if (!supportedHtmlLikeLanguages.includes(editor.document.languageId)) return;

    const lastChange = event.contentChanges[event.contentChanges.length - 1];
    if (lastChange.text !== '>') return;

    const position = lastChange.range.end;
    const currentLine = editor.document.lineAt(position.line).text;

    const tagName = htmlAutoCloser.shouldInsertClosingTag(currentLine, position.character);
    if (!tagName) return;
    if (selfClosingTags.has(tagName.toLowerCase()) || excludedTags.has(tagName)) return;

    const documentText = editor.document.getText();
    if (new RegExp(`</${tagName}>`, 'g').test(documentText)) return;

    htmlAutoCloser.insertClosingTag(tagName, position);
  });

  const autoCloseBraces = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document || event.contentChanges.length === 0) return;
    if (!supportedStyleLanguages.includes(editor.document.languageId)) return;

    const lastChange = event.contentChanges[event.contentChanges.length - 1];
    if (!styleAutoCloser.shouldInsertBraceBlock(lastChange.text)) return;

    const position = lastChange.range.end;
    styleAutoCloser.insertBraceBlock(position);
  });

  const manualCloseCommand = vscode.commands.registerCommand('extension.insertClosingTag', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !supportedHtmlLikeLanguages.includes(editor.document.languageId)) return;

    const position = editor.selection.active;
    const currentLine = editor.document.lineAt(position.line).text;

    const tagName = htmlAutoCloser.shouldInsertClosingTag(currentLine, position.character);
    if (!tagName) return;
    if (selfClosingTags.has(tagName.toLowerCase()) || excludedTags.has(tagName)) return;

    htmlAutoCloser.insertClosingTag(tagName, position);
  });

  context.subscriptions.push(autoCloseTag, autoCloseBraces, manualCloseCommand);
}

export function deactivate() {}
