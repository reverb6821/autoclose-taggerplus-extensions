const vscode = require('vscode');

function activate(context) {
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

  const config = vscode.workspace.getConfiguration('autoCloseTags');
  const excludedTags = new Set(config.get('excludedTags') || []);

  // Auto-close HTML-like tags
  const autoCloseTag = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document || event.contentChanges.length === 0) return;

    if (!supportedHtmlLikeLanguages.includes(editor.document.languageId)) return;

    const lastChange = event.contentChanges.at(-1);
    if (lastChange.text !== '>') return;

    const position = lastChange.range.end;
    const currentLine = editor.document.lineAt(position.line).text;
    const lineUpToCursor = currentLine.substring(0, position.character);

    const tagMatch = lineUpToCursor.match(/<(\w[\w\d-]*)[^<>]*[^\/]>$/);
    if (!tagMatch) return;

    const tagName = tagMatch[1];
    if (selfClosingTags.has(tagName.toLowerCase())) return;
    if (excludedTags.has(tagName)) return;

    const documentText = editor.document.getText();
    const closingTagExists = new RegExp(`</${tagName}>`, 'g').test(documentText);
    if (closingTagExists) return;

    const snippet = new vscode.SnippetString(`</${tagName}>`);
    editor.insertSnippet(snippet, position);
  });

  // Auto-close CSS/SCSS/LESS blocks
  const autoCloseBraces = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document || event.contentChanges.length === 0) return;

    if (!supportedStyleLanguages.includes(editor.document.languageId)) return;

    const lastChange = event.contentChanges.at(-1);
    if (lastChange.text !== '{') return;

    const position = lastChange.range.end;
    const snippet = new vscode.SnippetString('\n\t$0\n}');

    editor.insertSnippet(snippet, position);
  });

  const manualCloseCommand = vscode.commands.registerCommand('extension.insertClosingTag', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !supportedHtmlLikeLanguages.includes(editor.document.languageId)) return;

    const position = editor.selection.active;
    const currentLine = editor.document.lineAt(position.line).text;
    const lineUpToCursor = currentLine.substring(0, position.character);
    const tagMatch = lineUpToCursor.match(/<(\w[\w\d-]*)[^<>]*[^\/]>$/);
    if (!tagMatch) return;

    const tagName = tagMatch[1];
    if (selfClosingTags.has(tagName.toLowerCase())) return;
    if (excludedTags.has(tagName)) return;

    const snippet = new vscode.SnippetString(`</${tagName}>`);
    editor.insertSnippet(snippet, position);
  });

  context.subscriptions.push(autoCloseTag, autoCloseBraces, manualCloseCommand);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
};
