import * as vscode from 'vscode';
import { shouldInsertClosingTag } from '../src/htmlAutoCloser';

describe('htmlAutoCloser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shouldInsertClosingTag returns tagName for valid tag', () => {
    const line = '<div>';
    const cursorPos = line.length;
    const tag = shouldInsertClosingTag(line, cursorPos);
    expect(tag).toBe('div');
  });

  it('shouldInsertClosingTag returns null for self-closing tag', () => {
    const line = '<img src="x.jpg"/>';
    const cursorPos = line.length;
    const tag = shouldInsertClosingTag(line, cursorPos);
    expect(tag).toBeNull();
  });

it('insertSnippet is called on active editor', async () => {
  const editor = vscode.window.activeTextEditor!;
  await editor.insertSnippet(
    new vscode.SnippetString('</div>'),
    new vscode.Position(0, 5)
  );
  expect(editor.insertSnippet).toHaveBeenCalled();
});

});
