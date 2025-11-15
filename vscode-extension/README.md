# nb2pdf - VS Code Extension

Convert Jupyter Notebooks to beautiful, professional PDFs directly from VS Code!

## Features

- 📄 **One-Click Conversion** - Right-click any `.ipynb` file and convert to PDF
- 🎨 **Syntax Highlighting** - VS Code Dark+ color scheme for code
- 📊 **DataFrames** - Pandas DataFrames rendered as beautiful tables
- 📈 **Graphs** - Matplotlib figures embedded in PDF
- 👤 **Custom Headers** - Add your name, roll number, and course info
- ⚡ **Fast** - Executes and converts in seconds
- 🎓 **Student-Friendly** - Perfect for assignment submissions

## Quick Start

### 1. Install the Extension

Search for "nb2pdf" in VS Code Extensions marketplace and click Install.

### 2. Configure Your Info

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Run `nb2pdf: Configure Student Information`
3. Enter your details (name, roll number, course, assignment)

Or set in VS Code Settings:
```json
{
  "nb2pdf.studentName": "Your Full Name",
  "nb2pdf.rollNumber": "21f1234567",
  "nb2pdf.course": "IITM BS Degree - Data Science",
  "nb2pdf.assignment": "Assignment Title"
}
```

### 3. Convert a Notebook

**Method 1: Right-Click**
- Right-click any `.ipynb` file in Explorer
- Select "Convert Notebook to PDF"

**Method 2: Editor Button**
- Open a notebook in VS Code
- Click the PDF icon in the top-right toolbar

**Method 3: Command Palette**
- Open Command Palette (`Ctrl+Shift+P`)
- Run `nb2pdf: Convert Notebook to PDF`

## Requirements

### Python Dependencies

**Required:**
```bash
pip install reportlab
```

**Optional (for DataFrames and graphs):**
```bash
pip install pandas matplotlib numpy
```

✨ **NEW in v1.1.0**: The extension now **checks dependencies before converting** and offers to install them automatically!

**That's it!** The `nb2pdf.py` script is bundled with the extension - no manual setup needed!

## Extension Settings

This extension contributes the following settings:

* `nb2pdf.studentName`: Your full name for PDF header
* `nb2pdf.rollNumber`: Your roll number for PDF header
* `nb2pdf.course`: Your course name for PDF header
* `nb2pdf.assignment`: Assignment title for PDF header
* `nb2pdf.pythonPath`: Custom Python executable path (optional)
* `nb2pdf.autoOpenPdf`: Automatically open PDF after generation (default: true)

## Commands

* `nb2pdf: Convert Notebook to PDF` - Convert current/selected notebook
* `nb2pdf: Convert to PDF with Custom Name` - Specify custom output filename
* `nb2pdf: Configure Student Information` - Set up your student details
* `nb2pdf: Check Dependencies` - ✨ **NEW!** Verify Python and reportlab installation

## How It Works

1. **Executes** all notebook cells (top to bottom)
2. **Captures** code, outputs, DataFrames, and graphs
3. **Generates** professional PDF with:
   - Syntax-highlighted code
   - Formatted outputs
   - DataFrame tables
   - Embedded graphs
   - Custom headers
   - Page numbers

## Troubleshooting

### 🚨 Getting "script error" message?

**Don't reinstall the extension!** The issue is likely a missing Python library.

**Quick fix:**
```bash
pip install reportlab
```

Then reload VS Code: `Ctrl+Shift+P` → "Reload Window"

✨ **Tip**: Run `nb2pdf: Check Dependencies` command to verify your setup!

---

### Common Issues

**"Missing required library: reportlab"**
```bash
pip install reportlab
```

**"No module named 'matplotlib'" or "pandas"**
```bash
pip install matplotlib pandas
```

**"Python not found"**
- Set `nb2pdf.pythonPath` in VS Code settings
- Or ensure Python is in your system PATH
- Download Python 3.8+: https://www.python.org/downloads/

**Permission denied when installing**
```bash
pip install --user reportlab
```

**Still not working?**
- Check full troubleshooting guide: [EXTENSION_ERROR_FIX.md](https://github.com/ganesh250684/nb2pdf/blob/main/EXTENSION_ERROR_FIX.md)
- Run `nb2pdf: Check Dependencies` to see detailed status
- Check VS Code Output panel for errors

## What's Included in PDFs

✅ Syntax-highlighted Python code (VS Code Dark+ theme)  
✅ All print statements and cell outputs  
✅ Pandas DataFrames as formatted tables  
✅ Matplotlib/pyplot graphs and charts  
✅ Custom student information header  
✅ Professional page numbering  
✅ Error messages (if any cells fail)  

## Known Limitations

- Interactive widgets (ipywidgets) are not supported
- Only matplotlib graphs (plotly requires additional setup)
- Very large outputs are truncated at 1MB

## Release Notes

### 1.1.0 - Improved Error Handling 🔧

**Fixed the confusing "script error" message!**

- ✅ Proactive dependency checking before conversion
- ✅ New command: "Check Dependencies" to verify setup
- ✅ Auto-install option for missing libraries
- ✅ Interactive installation guide with step-by-step instructions
- ✅ Better error messages that tell you exactly what's wrong
- ✅ Links to troubleshooting documentation
- ✅ Automatic temp file cleanup
- ✅ 60-second timeout protection

**What changed?**
Previously, if `reportlab` wasn't installed, you'd see a confusing "script error! Please reinstall" message. Now, the extension checks dependencies FIRST and shows helpful messages like "Missing required library: reportlab" with an "Install Now" button!

See full changelog: [CHANGELOG.md](https://github.com/ganesh250684/nb2pdf/blob/main/vscode-extension/CHANGELOG.md)

---

### 1.0.0

Initial release of nb2pdf extension:
- Right-click context menu
- Command palette integration
- Settings UI for student info
- Automatic dependency detection
- PDF preview integration

## Contributing

Found a bug? Have a feature request?  
https://github.com/ganesh250684/nb2pdf/issues

## 💖 Support This Extension

If **nb2pdf** saved you hours of manual formatting and helped you submit professional-looking assignments, consider supporting its development:

### ☕ Buy Me a Coffee

Creating and maintaining this extension takes time and effort. Your support helps keep it:
- ✅ Free forever
- ✅ Actively maintained with bug fixes
- ✅ Improved with new features
- ✅ Compatible with latest VS Code versions

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow.svg?style=for-the-badge)](https://www.buymeacoffee.com/ganesh2506)

**Can't donate?** No problem! You can still help by:
- ⭐ Giving this extension a 5-star rating
- 🌟 Starring the [GitHub repo](https://github.com/ganesh250684/nb2pdf)
- 📢 Sharing it with classmates and colleagues
- 💬 Leaving a review on the marketplace

Every bit of support (financial or otherwise) motivates me to keep improving this tool for students everywhere! 🙏

## License

MIT License - Free to use and share!

---

**Enjoy creating beautiful PDFs!** 🎉

If this extension helped you, please ⭐ star the repo and leave a review!
