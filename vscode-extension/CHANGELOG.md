# Change Log

All notable changes to the "nb2pdf" extension will be documented in this file.

## [1.1.9] - 2025-11-17

### 🔧 Fixed
- **Stable footer link** – Marketplace footer link is now rendered by the page callback, so it stays clickable without triggering ReportLab annotation errors.
- **Missing output folder** – The converter now auto-creates the target output directory when it doesn't exist, preventing fresh installs from failing.

### 📝 Updated
- Documentation and screenshots updated for the new `name`/`id` field names and marketplace link.
- VSIX packaging validated against the latest retail analysis notebook and sample library notebook.

## [1.1.8] - 2024-11-15

### 🔧 Fixed
- **Automatic settings migration** - Extension now automatically migrates old settings (studentName, rollNumber, course, assignment) to new field names (name, id, projectTitle, projectSubtitle)
- Users upgrading from v1.1.6 or earlier will see their settings preserved automatically
- No need to reconfigure manually after update

### 🎯 Improved
- Settings migration happens seamlessly on extension activation
- Informational message confirms successful migration

## [1.1.7] - 2024-11-15

### 🐛 Fixed
- **Line spacing in code blocks** - Increased line height from 9pt to 14pt (1.55x) to prevent text from being cut off between lines
- Multi-line code now displays with proper spacing for better readability

### 🔄 Changed
- **Renamed configuration fields** for broader use cases:
  - `studentName` → `name` (Your Name)
  - `rollNumber` → `id` (Your ID - student ID, employee ID, etc.)
  - `course` → `projectTitle` (Project Title)
  - `assignment` → `projectSubtitle` (Project SubTitle)
- Updated PDF headers with new field labels
- All fields now optional except Name

### 🎯 Improved
- More flexible for non-student users (professionals, researchers, etc.)
- Better field naming for project documentation
- Cleaner default values

---

## [1.1.6] - 2024-01-XX

### 🎁 Added
- **Buy Me a Coffee support option** - Added optional "☕ Buy Me a Coffee" button in success message
- Appears after successful PDF generation alongside "Open PDF" and "Show in Explorer"
- Non-intrusive way to support the extension's development
- Updated README with support section explaining how donations help

### 🎯 Improved
- Enhanced marketplace description with contribution options
- Better visibility for project support

---

## [1.1.5] - 2024-01-XX

### 🐛 Fixed
- **False error reporting** - Extension now checks if PDF was actually created before showing error message
- When warnings appear in stderr but PDF is generated successfully, shows success message instead of error
- Improved success messages with file size confirmation (e.g., "PDF created successfully: output.pdf (245.67 KB)")
- Users no longer see confusing errors when PDF generation completes successfully

### 🎯 Improved
- Better feedback when PDF is created despite warnings
- File size shown in success message for confirmation

---

## [1.1.4] - 2024-01-XX

### 🐛 Fixed
- **Text trimming at page bottom** - Increased bottom margin from 2.5cm to 3.5cm to prevent text from being cut off near page numbers
- Content now has proper spacing from page footer
- Better readability and professional appearance

---

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
