import { extractTagName } from '../src/tagUtils';

describe('extractTagName', () => {
  it('returns tag name for simple tag', () => {
    expect(extractTagName('<div>')).toBe('div');
  });

  it('returns tag name with attributes', () => {
    expect(extractTagName('<span class="class1" id="x">')).toBe('span');
  });

  it('returns null for self-closing tag', () => {
    expect(extractTagName('<img src="x.jpg"/>')).toBeNull();
  });

  it('returns null if no valid tag found', () => {
    expect(extractTagName('just text')).toBeNull();
  });
});