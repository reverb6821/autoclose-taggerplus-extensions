import * as vscode from 'vscode';
import * as styleAutoCloser from '../src/styleAutoCloser';

describe('styleAutoCloser', () => {
  describe('shouldInsertBraceBlock', () => {
    it('returns true for {', () => {
      expect(styleAutoCloser.shouldInsertBraceBlock('{')).toBe(true);
    });

    it('returns false for other chars', () => {
      expect(styleAutoCloser.shouldInsertBraceBlock('a')).toBe(false);
      expect(styleAutoCloser.shouldInsertBraceBlock('}')).toBe(false);
    });
  });

  describe('insertBraceBlock', () => {
    it('calls vscode insertSnippet with correct snippet', async () => {
      const pos = new vscode.Position(0, 0);
      await styleAutoCloser.insertBraceBlock(pos);
      expect(vscode.window.activeTextEditor?.insertSnippet).toHaveBeenCalledWith(
        expect.any(vscode.SnippetString),
        pos
      );
    });
  });
});
