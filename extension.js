const vscode = require('vscode');

function activate(context) {
  const disposable = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document || event.contentChanges.length === 0) return;

    const lastChange = event.contentChanges.at(-1);
    if (lastChange.text !== '>') return;

    const position = lastChange.range.end;
    const currentLine = editor.document.lineAt(position.line).text;
    const lineUpToCursor = currentLine.substring(0, position.character);

    const tagMatch = lineUpToCursor.match(/<(\w[\w\d-]*)[^<>]*[^\/]>$/);
    if (!tagMatch) return;

    const tagName = tagMatch[1];
    const selfClosingTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
    if (selfClosingTags.has(tagName.toLowerCase())) return;

    const documentText = editor.document.getText();
    const closingTagExists = new RegExp(`</${tagName}>`, 'g').test(documentText);
    if (closingTagExists) return;

    const snippet = new vscode.SnippetString(`$0</${tagName}>`);
    editor.insertSnippet(snippet, position);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
