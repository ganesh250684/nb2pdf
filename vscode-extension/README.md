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

The extension will detect missing dependencies and offer to install them.

### Setup nb2pdf.py

Place `nb2pdf.py` in your workspace root folder. Download it from:
https://github.com/ganesh250684/nb2pdf

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

### "nb2pdf.py not found"
- Ensure `nb2pdf.py` is in your workspace root
- Or download from https://github.com/ganesh250684/nb2pdf

### "No module named 'reportlab'"
```bash
pip install reportlab
```

### "No module named 'matplotlib'" or "pandas"
```bash
pip install matplotlib pandas
```

### Python not found
- Set `nb2pdf.pythonPath` in settings
- Or ensure Python is in your PATH

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

## License

MIT License - Free to use and share!

---

**Enjoy creating beautiful PDFs!** 🎉

If this extension helped you, please ⭐ star the repo and leave a review!
