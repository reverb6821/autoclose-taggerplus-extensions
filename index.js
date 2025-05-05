const vscode = require('vscode');

function activate(context) {
  const disposable = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document) return;

    const changes = event.contentChanges;
    if (changes.length === 0) return;

    const lastChange = changes[changes.length - 1];
    const insertedText = lastChange.text;

    if (insertedText !== '>') return;

    const position = lastChange.range.end;
    const line = editor.document.lineAt(position.line).text.substring(0, position.character);
    const tagMatch = line.match(/<(\w[\w\d-]*)[^<>]*[^\/]>$/);
    if (!tagMatch) return;

    const tagName = tagMatch[1];
    const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];
    
    if (selfClosingTags.includes(tagName.toLowerCase())) return;

    //? check if the tag is already closed elsewhere in the document
    const documentText = editor.document.getText();
    const closingTagPattern = new RegExp(`</${tagName}>`, 'g');
    const existingClosingTags = [...documentText.matchAll(closingTagPattern)];

    //? if we find an existing closing tag, do not insert anything
    if (existingClosingTags.length > 0) return;

    //? check if the cursor is inside a nested tag
    const cursorLineText = editor.document.lineAt(position.line).text;
    const openTags = cursorLineText.match(/<(\w+)[^>]*>/g);
    const openTagCount = openTags ? openTags.length : 0;
    const closeTags = cursorLineText.match(/<\/(\w+)[^>]*>/g);
    const closeTagCount = closeTags ? closeTags.length : 0;

    //? if the number of opening tags is greater than the number of closing tags, the cursor is inside a nested tag
    if (openTagCount > closeTagCount) {
      const indent = editor.options.insertSpaces ? ' '.repeat(editor.options.tabSize || 2) : '\t';
      const snippet = new vscode.SnippetString(`\n${indent}$0\n</${tagName}>`);
      editor.insertSnippet(snippet, position);
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
