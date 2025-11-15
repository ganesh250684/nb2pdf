# Change Log

All notable changes to the "nb2pdf" extension will be documented in this file.

## [1.1.3] - 2024-01-XX

### 🐛 Fixed
- **Critical: "script not found" error** - Fixed incorrect extension ID lookup (was `ganesh-kumbhar.nb2pdf`, now `ganeshkumbhar.nb2pdf`)
- Extension now correctly finds bundled nb2pdf.py script
- Resolves "Extension may be corrupted" error for all users

---

## [1.1.2] - 2024-01-XX

### 🐛 Fixed
- **Permission denied error** - When PDF file is open/locked, automatically creates new file with timestamp (e.g., `output_20251115_191341.pdf`)
- No more crashes when output file already exists and is in use
- Automatic unique filename generation prevents data loss

### 🎯 Improved
- Better user experience when converting multiple times
- Informative message shows new filename when original is locked

---

## [1.1.1] - 2024-01-XX

### 🐛 Fixed
- **Windows emoji encoding crash** - Replaced emoji characters (📓⚙️✅❌) with ASCII alternatives ([*], [SUCCESS], [ERROR])
- UnicodeEncodeError on Windows consoles using cp1252 encoding
- Script now works on all Windows PowerShell, CMD, and terminal configurations

### 📦 Updated
- Bundled nb2pdf.py script with encoding fixes

---

## [1.1.0] - 2024-01-XX

### ✨ Added
- **Proactive dependency checking** - Extension now checks for Python and reportlab BEFORE attempting conversion
- **New command: "Check Dependencies"** - Verify your setup anytime from the Command Palette
- **Auto-install option** - Click "Install Now" button to automatically install reportlab
- **Interactive installation guide** - Beautiful webview panel with step-by-step instructions
- **Timeout protection** - 60-second timeout prevents hanging on long-running notebooks

### 🔧 Improved
- **Better error messages** - Specific, actionable errors instead of generic "script error"
  - Clear message when Python is not found
  - Helpful guidance when reportlab is missing
  - Syntax error detection with link to notebook
  - Timeout errors with explanation
- **Temp file cleanup** - Automatically removes temporary config files after conversion
- **Error categorization** - Different error types show appropriate solutions

### 🐛 Fixed
- **Issue #1: Confusing "script error" message** - Now shows exact problem (e.g., "Missing required library: reportlab")
- **Misleading reinstall suggestion** - Extension no longer suggests reinstalling when the real issue is missing Python dependencies
- **No dependency verification** - Extension now checks Python and reportlab before running

### 📚 Documentation
- Added troubleshooting guide: [EXTENSION_ERROR_FIX.md](https://github.com/ganesh250684/nb2pdf/blob/main/EXTENSION_ERROR_FIX.md)
- Improved error messages link to specific help resources
- Added "Get Help" button that opens GitHub issues

---

## [1.0.0] - 2024-01-XX

### Initial Release
- Convert Jupyter Notebooks (.ipynb) to PDF
- Syntax highlighting with VS Code Dark+ theme colors
- Beautiful DataFrame table rendering
- Preserve print statements and outputs
- Custom student information configuration
- Right-click context menu on .ipynb files
- Toolbar button in notebook editor
- Custom PDF naming option

---

## How to Update

If you installed from the VS Code Marketplace, the extension will update automatically.

If you installed manually (.vsix file):
1. Uninstall the old version
2. Install the new .vsix file
3. Reload VS Code

## Feedback

Found a bug or have a feature request? Please [open an issue](https://github.com/ganesh250684/nb2pdf/issues).

---

**Enjoy creating beautiful PDFs! 📄✨**
