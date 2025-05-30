# AutoClose Tags+

A lightweight and smart Visual Studio Code extension that **automatically inserts closing HTML-like tags** and **CSS/SCSS/LESS code blocks**.

---

## ✨ Features

### ✅ Auto-Close HTML/JSX/Template Tags
- Automatically inserts closing tags when typing `>` after an opening tag.
- Cursor is placed between the opening and closing tag.
- Works with:
  - HTML
  - Vue
  - Astro
  - React (JSX/TSX)
- Skips self-closing tags like `<img />`, `<input />`, etc.
- Skips custom tags specified in settings.

### ✅ Auto-Close CSS/SCSS/LESS Braces
- Automatically inserts closing `}` with proper indentation after typing `{`.
- Cursor is placed inside the block:
  ```css
  .selector {
      |   ← cursor here
  }
  ```

### ✅ Manual Closing Tag Command
- Command Palette: `Insert Closing Tag`
- Keybinding: `Ctrl + Alt + .`

---

## ⚙️ Configuration

You can customize excluded tags in your `settings.json`:

```json
"autoCloseTags.excludedTags": [
  "MyComponent",
  "Fragment"
]
```
---

## 🧠 Language Support

| Language         | Tag Auto-Close | Brace Auto-Close |
|------------------|----------------|------------------|
| HTML             | ✅              | ❌               |
| Vue              | ✅              | ❌               |
| Astro            | ✅              | ❌               |
| JavaScript (JSX) | ✅              | ❌               |
| TypeScript (TSX) | ✅              | ❌               |
| CSS              | ❌              | ✅               |
| SCSS             | ❌              | ✅               |
| LESS             | ❌              | ✅               |

---

## 🚀 Usage

1. Open any supported file (e.g. `.html`, `.jsx`, `.css`, etc.).
2. Type an opening tag like `<div>` → closing `</div>` is inserted automatically.
3. Type `{` in a `.css/.scss/.less` file → block with closing brace is inserted.

---

## 📦 Installation

1. Clone this repo
2. Run `vsce package` (requires [`vsce`](https://code.visualstudio.com/api/working-with-extensions/publishing-extension))
3. Install `.vsix` file via VS Code:  
   `Extensions → ... → Install from VSIX...`

---

## 🙌 Contribute

Pull requests and suggestions are welcome!

---

## 📝 License

MIT