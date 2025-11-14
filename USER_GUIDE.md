# 📘 How to Use nb2pdf - Step-by-Step Guide for Students

## What is nb2pdf?

**nb2pdf** (Notebook to PDF) is a tool that converts your Jupyter Notebooks (`.ipynb` files) into **professional, submission-ready PDF reports** with:
- ✅ Syntax-highlighted code (VS Code color scheme)
- ✅ All your print statements and outputs
- ✅ DataFrames rendered as beautiful tables
- ✅ Your student information in the header
- ✅ Page numbers
- ✅ Professional formatting

### Why Does This Exist?

**The Real Problem It Solves:**
1. **Teachers want PDF submissions** - They can't run everyone's code, they need a document showing what you did
2. **Jupyter's built-in PDF export sucks** - It's ugly, loses formatting, and often breaks
3. **Manual copy-paste is tedious** - Copying code and outputs to Word/Google Docs is time-consuming and error-prone
4. **You need to show both code AND output** - Not just screenshots, but actual executable results

**nb2pdf solves all these problems in one command!** 🎉

---

## 📥 Part 1: Getting the Files

### Option A: If Ganesh Shared via GitHub
```powershell
# Clone the repository
git clone https://github.com/Ganesh2506/Project-A.git
cd Project-A
```

### Option B: If Shared via ZIP File/Google Drive
1. Download the ZIP file
2. Extract it to a folder (e.g., `D:\IITM\nb2pdf-tool\`)
3. You need these files:
   - `nb2pdf.py` (the main tool)
   - `student_info.json` (your details template)
   - `INSTRUCTIONS.md` (this file)

---

## 🔧 Part 2: Installation & Setup

### Step 1: Make Sure You Have Python
```powershell
# Check if Python is installed
python --version
```
You should see something like `Python 3.10.x` or higher. If not, install Python from [python.org](https://python.org).

### Step 2: Install Required Library
```powershell
# Install reportlab (the PDF generation library)
pip install reportlab
```

### Step 3: Edit Your Student Information
1. Open `student_info.json` in any text editor (Notepad, VS Code, etc.)
2. Replace the values with YOUR information:

```json
{
    "student_name": "Your Full Name",
    "roll_number": "21f1234567",
    "course": "IITM BS Degree - Data Science",
    "assignment": "Part A: City Library Management System"
}
```

**Important:** Keep the structure exactly as shown, just change the values inside the quotes!

---

## 🚀 Part 3: Using nb2pdf

### Basic Usage

```powershell
# Navigate to where nb2pdf.py is located
cd "D:\IITM\Project A"

# Convert your notebook to PDF
python nb2pdf.py "path\to\your\notebook.ipynb"
```

### Example:
```powershell
# If your notebook is in the same folder
python nb2pdf.py "library_demo.ipynb"

# If it's in a subfolder
python nb2pdf.py "library\library_demo.ipynb"

# If it's in a different location
python nb2pdf.py "C:\Users\YourName\Documents\my_assignment.ipynb"
```

### Specify Output Location
```powershell
# Save PDF with a specific name
python nb2pdf.py "my_notebook.ipynb" --output "MyAssignment_Report.pdf"

# Save to a different folder
python nb2pdf.py "my_notebook.ipynb" --output "D:\Submissions\Assignment.pdf"
```

### Use Different Student Info
```powershell
# If you have multiple student_info files
python nb2pdf.py "notebook.ipynb" --config "student_info_john.json"
```

---

## 📋 Part 4: What You'll See

When you run the command, you'll see:
```
📓 Loading notebook: D:\IITM\Project A\library\library_demo.ipynb
⚙️  Executing cells...
📄 Generating PDF: D:\IITM\Project A\library\City_Library_Report.pdf
✅ PDF created successfully: D:\IITM\Project A\library\City_Library_Report.pdf
```

The PDF will contain:
- **Header** with your name, roll number, course, assignment title
- **Cell 1, Cell 2, etc.** with:
  - 💻 Code (with purple keywords, orange strings, green comments)
  - **Output:** section with print statements
  - **Tables** for DataFrames (like pandas tables in VS Code)
  - **Errors** if any cell failed (in red)
- **Page numbers** at the bottom

---

## 🎓 Part 5: Sharing This Tool with Others

### What to Share:
You only need to share 2 files:
1. **`nb2pdf.py`** - The tool itself
2. **`student_info.json`** - Template (they'll edit it with their info)

### How to Share:

**Method 1: WhatsApp/Email**
- Attach both files
- Tell them to run: `pip install reportlab` first
- Share this HOW_TO_USE guide

**Method 2: GitHub**
- Fork the repository
- Share the GitHub link
- They clone and use

**Method 3: Google Drive/OneDrive**
- Upload both files to a shared folder
- Share the link with view/download permissions

---

## ❓ Part 6: Troubleshooting

### Problem: "python is not recognized"
**Solution:** Python not installed or not in PATH
```powershell
# Use full path to python
C:\Python313\python.exe nb2pdf.py "notebook.ipynb"
```

### Problem: "No module named 'reportlab'"
**Solution:** Install the library
```powershell
pip install reportlab
```

### Problem: "Permission denied" error
**Solution:** The PDF file is currently open. Close it and try again.

### Problem: "FileNotFoundError: notebook.ipynb"
**Solution:** Make sure the path is correct. Use quotes for paths with spaces:
```powershell
python nb2pdf.py "D:\My Documents\notebook.ipynb"
```

### Problem: "Syntax errors" in the output
**Solution:** Your notebook has syntax errors. Fix them in VS Code first, then regenerate PDF.

### Problem: PDF looks different from VS Code
**Solution:** Make sure you:
1. Saved your notebook before running nb2pdf
2. Run all cells in VS Code first to see expected output
3. Check that all imports (pandas, etc.) are in your notebook

---

## 🌟 Part 7: Tips & Best Practices

### ✅ DO:
- Run all cells in your notebook before converting to PDF
- Save your notebook (Ctrl+S) before running nb2pdf
- Use descriptive output names: `Assignment1_RollNumber.pdf`
- Test on a small notebook first
- Keep student_info.json updated

### ❌ DON'T:
- Don't have the PDF open when regenerating (close it first)
- Don't rename `nb2pdf.py` to something else
- Don't delete the `student_info.json` file
- Don't try to edit the PDF directly

---

## 📞 Getting Help

If you're stuck:
1. Read the error message carefully
2. Check the Troubleshooting section above
3. Make sure all files are in the right place
4. Try with a simple test notebook first
5. Ask Ganesh or classmates who've used it successfully

---

## 🎯 Quick Reference Commands

```powershell
# Install library (one time only)
pip install reportlab

# Basic conversion
python nb2pdf.py "my_notebook.ipynb"

# With custom output name
python nb2pdf.py "notebook.ipynb" --output "Report.pdf"

# With custom config
python nb2pdf.py "notebook.ipynb" --config "my_info.json"

# Full example with paths
python "C:\Tools\nb2pdf.py" "D:\Assignments\proj.ipynb" --output "D:\Submissions\Project_Report.pdf"
```

---

## 📜 About nb2pdf

**Created by:** AI-assisted development for IITM students  
**License:** Free to use and share  
**Purpose:** Help students create professional PDF submissions from Jupyter Notebooks  
**Version:** 1.0  

**Yes, the name "nb2pdf" was AI-generated** - it follows the Unix tradition of abbreviated, functional names:
- `nb` = notebook (.ipynb files)
- `2` = to (conversion)
- `pdf` = PDF format

Similar to other tools like `jpg2pdf`, `md2html`, etc. It's short, memorable, and clearly describes what it does! 🎯

---

**Happy PDF-making! 🚀**
