# 📦 How to Republish nb2pdf Extension v1.1.0

Follow these steps to package and publish the updated extension to the VS Code Marketplace.

---

## Prerequisites

### 1. Install Required Tools

```powershell
# Install vsce (VS Code Extension CLI)
npm install -g @vscode/vsce

# Install TypeScript (if not already installed)
npm install -g typescript
```

### 2. Navigate to Extension Directory

```powershell
cd "d:\IITM\Project A\nb2pdf\vscode-extension"
```

### 3. Install Dependencies

```powershell
npm install
```

---

## Build & Test Locally

### 1. Compile TypeScript

```powershell
npm run compile
# OR manually:
tsc -p ./
```

### 2. Test in VS Code

1. Open the `vscode-extension` folder in VS Code
2. Press `F5` to launch Extension Development Host
3. Test the new features:
   - Run `nb2pdf: Check Dependencies`
   - Try converting without reportlab installed (should show new error message)
   - Install reportlab using the "Install Now" button
   - Verify conversion works after install

### 3. Check for Errors

```powershell
# Run linter
npm run lint

# Check TypeScript compilation
tsc --noEmit
```

---

## Package the Extension

### 1. Create .vsix Package

```powershell
vsce package
```

This will create: `nb2pdf-1.1.0.vsix`

### 2. Test the Packaged Extension

1. **Uninstall current version** from VS Code Extensions
2. **Install from .vsix file**:
   - Open Extensions view (`Ctrl+Shift+X`)
   - Click `...` (three dots) at top
   - Select "Install from VSIX..."
   - Choose `nb2pdf-1.1.0.vsix`
3. **Test thoroughly**:
   - Test without reportlab installed
   - Test with reportlab installed
   - Test all error scenarios
   - Test the new "Check Dependencies" command

---

## Publish to Marketplace

### 1. Login to Azure DevOps / VS Code Marketplace

If first time publishing:
```powershell
vsce login ganeshkumbhar
```

Enter your Personal Access Token (PAT) when prompted.

**Don't have a PAT?**
1. Go to: https://dev.azure.com/
2. Click user icon → Personal Access Tokens
3. Create new token with:
   - Organization: All accessible organizations
   - Scopes: Marketplace → **Manage**
   - Expiration: 1 year

### 2. Publish the Extension

```powershell
vsce publish
```

This will:
- Compile the extension
- Package it
- Upload to marketplace
- Auto-increment version (or use current version from package.json)

**OR** publish specific version:
```powershell
vsce publish 1.1.0
```

### 3. Verify Publication

1. Wait 5-10 minutes for marketplace to update
2. Visit: https://marketplace.visualstudio.com/items?itemName=ganesh-kumbhar.nb2pdf
3. Check version shows 1.1.0
4. Read the changelog and description

---

## Alternative: Manual Publish via Web UI

If `vsce publish` doesn't work:

### 1. Package Extension
```powershell
vsce package
```

### 2. Upload Manually
1. Go to: https://marketplace.visualstudio.com/manage/publishers/ganeshkumbhar
2. Click on `nb2pdf` extension
3. Click "Update" or "..." → "Upload new version"
4. Upload `nb2pdf-1.1.0.vsix`
5. Fill in release notes:
   ```
   ## What's New in v1.1.0
   
   Fixed the confusing "script error" message!
   
   - ✅ Checks dependencies BEFORE conversion
   - ✅ New "Check Dependencies" command
   - ✅ Auto-install button for reportlab
   - ✅ Better, specific error messages
   - ✅ Interactive installation guide
   
   See full changelog: https://github.com/ganesh250684/nb2pdf/blob/main/vscode-extension/CHANGELOG.md
   ```
6. Click "Upload"

---

## Post-Publication

### 1. Update GitHub Repository

```powershell
git add .
git commit -m "Release v1.1.0 - Improved error handling and dependency checking"
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

### 2. Create GitHub Release

1. Go to: https://github.com/ganesh250684/nb2pdf/releases
2. Click "Draft a new release"
3. Tag version: `v1.1.0`
4. Release title: `v1.1.0 - Improved Error Handling`
5. Description:
   ```markdown
   ## What's New
   
   Fixed the confusing "script error" message that many users were experiencing!
   
   ### ✨ New Features
   - Proactive dependency checking before conversion
   - New command: "nb2pdf: Check Dependencies"
   - Auto-install button for missing libraries
   - Interactive installation guide
   
   ### 🔧 Improvements
   - Better error messages (specific, not generic)
   - 60-second timeout protection
   - Automatic temp file cleanup
   - Error categorization with appropriate solutions
   
   ### 🐛 Fixed
   - #1: Misleading "script error" message
   - No dependency verification before running
   
   See full changelog: [CHANGELOG.md](./vscode-extension/CHANGELOG.md)
   ```
6. Attach files: `nb2pdf-1.1.0.vsix`
7. Click "Publish release"

### 3. Notify Users

Share the quick fix message with users who reported the issue:

**Copy from:** `QUICK_FIX_MESSAGE.md`

**Share via:**
- WhatsApp groups
- Email
- Discord/Slack
- GitHub issue responses
- Social media

### 4. Update Documentation

Make sure these files are in the GitHub repo:
- ✅ `vscode-extension/CHANGELOG.md`
- ✅ `vscode-extension/README.md` (updated)
- ✅ `vscode-extension/QUICK_FIX_MESSAGE.md`
- ✅ `EXTENSION_ERROR_FIX.md` (in main nb2pdf folder)

---

## Verification Checklist

Before publishing, verify:

- [ ] Version bumped to 1.1.0 in `package.json`
- [ ] `extension.ts` has `checkDependencies()` function
- [ ] New command `nb2pdf.checkDependencies` in package.json
- [ ] CHANGELOG.md created with v1.1.0 notes
- [ ] README.md updated with new features
- [ ] TypeScript compiles without errors
- [ ] Extension tested in development mode
- [ ] Extension tested from .vsix package
- [ ] All error scenarios tested:
  - [ ] Missing Python
  - [ ] Missing reportlab
  - [ ] Syntax errors in notebook
  - [ ] Timeout errors
- [ ] "Check Dependencies" command works
- [ ] "Install Now" button works
- [ ] Manual installation guide displays correctly
- [ ] Error messages link to correct documentation

---

## Rollback Plan

If something goes wrong after publishing:

### Option 1: Publish a hotfix
```powershell
# Fix the issue
# Bump version to 1.1.1
vsce publish 1.1.1
```

### Option 2: Unpublish (LAST RESORT)
```powershell
vsce unpublish ganeshkumbhar.nb2pdf
```
**Warning**: This removes the extension from marketplace entirely!

---

## Support

- **Extension Marketplace**: https://marketplace.visualstudio.com/manage/publishers/ganeshkumbhar
- **GitHub Issues**: https://github.com/ganesh250684/nb2pdf/issues
- **VS Code Extension Docs**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

---

**Good luck with the release! 🚀**

Your users will appreciate the better error handling! 🎉
