// export const window = {
//   activeTextEditor: {
//     insertSnippet: jest.fn(() => Promise.resolve(true))
//   }
// };
export const window = {
  activeTextEditor: {
    insertSnippet: jest.fn(() => Promise.resolve(true)),
    document: {
      languageId: 'css',
      getText: jest.fn(() => ''),
      lineAt: jest.fn(() => ({ text: '' })),
    },
    selection: {
      active: { line: 0, character: 0 },
    },
  },
};

export const SnippetString = class {
  constructor(public value: string) {}
};

export const commands = {
  registerCommand: jest.fn(),
};

export const workspace = {
  getConfiguration: jest.fn(() => ({
    get: jest.fn(() => []),
  })),
  onDidChangeTextDocument: jest.fn(),
};

export const Position = class {
  constructor(public line: number, public character: number) {}
};

export const languages = {
  registerCompletionItemProvider: jest.fn(),
};
