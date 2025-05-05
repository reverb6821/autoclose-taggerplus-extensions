# Auto Tagger

A Visual Studio Code extension that automatically closes HTML, XML, JSX, and Vue tags as you type.

## ✨ Features

- When you type an opening tag like `<div>`, it automatically inserts the corresponding closing tag `</div>`.
- Supports HTML, XML, React (JSX/TSX), and Vue.
- Ignores self-closing tags such as `<input />`, `<img />`, etc.

## 🧠 Supported Languages

- HTML
- XML (including Android layout XML)
- JavaScript React (JSX)
- TypeScript React (TSX)
- Vue
- XAML (for Xamarin and WPF)
- Svelte
- Astro
- JSON

## 🚀 How It Works

1. Install the extension (from VSIX or Marketplace).
2. Start typing an opening tag like `<section>`.
3. As soon as you type `>`, the matching `</section>` is inserted automatically.

## ✨ Features

- **Context-Aware**: The extension checks if a closing tag already exists in the document before adding it.
- **Nested Tag Handling**: If your cursor is inside a nested tag, the extension ensures that only the appropriate closing tag is inserted.
- **Avoid Duplicate Closing Tags**: If a closing tag for the current tag is already present in the document, it will not be inserted again.


## 🔧 Requirements

- Visual Studio Code version `^1.70.0` or higher.

## 📋 Settings

You can control the behavior of the closing tags with the `AutoTagger` settings.

### insertOnNewLine

- **Type**: `boolean`
- **Default**: `true`
- **Description**: If set to `true`, closing tags will be inserted on a new line with indentation. If set to `false`, they will be inserted on the same line.

To configure this setting, go to **File > Preferences > Settings**, search for `AutoClose Tags+`, and toggle the `insertOnNewLine` setting.

## 📦 Install from VSIX

```bash
code --install-extension autoclose-tags-0.0.1.vsix
```