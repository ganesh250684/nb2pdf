# nb2pdf VS Code Extension - Setup & Publishing Guide

## Prerequisites

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   npm --version
   ```

2. **Visual Studio Code Extension Manager (vsce)**
   ```bash
   npm install -g @vscode/vsce
   ```

3. **VS Code** installed

## Development Setup

### 1. Install Dependencies

```bash
cd vscode-extension
npm install
```

### 2. Compile TypeScript

```bash
npm run compile
```

Or watch mode for development:
```bash
npm run watch
```

### 3. Test the Extension

1. Open `vscode-extension` folder in VS Code
2. Press `F5` to launch Extension Development Host
3. In the new VS Code window:
   - Open a folder with `nb2pdf.py` and a `.ipynb` file
   - Right-click the notebook → "Convert Notebook to PDF"
   - Or use Command Palette → "nb2pdf: Convert Notebook to PDF"

## Packaging the Extension

### Create .vsix file

```bash
cd vscode-extension
vsce package
```

This creates `nb2pdf-1.0.0.vsix`

### Install Locally

```bash
code --install-extension nb2pdf-1.0.0.vsix
```

## Publishing to VS Code Marketplace

### 1. Create Publisher Account

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub account
3. Create a publisher (e.g., `ganesh-kumbhar`)

### 2. Get Personal Access Token

1. Go to https://dev.azure.com/
2. Click User Settings → Personal Access Tokens
3. Create new token:
   - Name: "VS Code Marketplace"
   - Organization: "All accessible organizations"
   - Scopes: **Marketplace → Manage**
   - Expiration: 1 year

### 3. Login with vsce

```bash
vsce login ganesh-kumbhar
```

Enter your Personal Access Token when prompted.

### 4. Publish

```bash
cd vscode-extension
vsce publish
```

Or specify version:
```bash
vsce publish 1.0.1
vsce publish minor
vsce publish major
```

### 5. Update Extension

After making changes:

```bash
# Update version in package.json, then:
npm run compile
vsce publish
```

## Extension Icon

To add an icon:

1. Create a 128x128 PNG icon
2. Save as `vscode-extension/images/icon.png`
3. Update `package.json`:
   ```json
   "icon": "images/icon.png"
   ```

## Marketplace Page

After publishing, your extension will be at:
```
https://marketplace.visualstudio.com/items?itemName=ganesh-kumbhar.nb2pdf
```

### Customize Marketplace Page

- Update `README.md` with screenshots
- Add badges (downloads, ratings, version)
- Include GIFs showing the extension in action

## Troubleshooting

### vsce: command not found
```bash
npm install -g @vscode/vsce
```

### "Missing publisher name"
Add to `package.json`:
```json
"publisher": "ganesh-kumbhar"
```

### "Missing repository"
Add to `package.json`:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/ganesh250684/nb2pdf"
}
```

## File Structure

```
vscode-extension/
├── src/
│   └── extension.ts       # Main extension code
├── out/                   # Compiled JavaScript (generated)
├── node_modules/          # Dependencies (generated)
├── package.json           # Extension manifest
├── tsconfig.json          # TypeScript config
├── README.md              # Marketplace description
├── .vscodeignore          # Files to exclude from package
└── .gitignore             # Git ignore rules
```

## Next Steps

1. ✅ Test extension thoroughly
2. ✅ Create screenshots/GIFs for README
3. ✅ Add extension icon
4. ✅ Get publisher account
5. ✅ Publish to marketplace!

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)

---

Good luck with your extension! 🚀
