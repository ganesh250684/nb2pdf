# Quick Start Guide 🚀

Get nb2pdf running in **2 minutes**!

## What nb2pdf Does

**nb2pdf automatically runs all cells in your notebook and generates a PDF** - you don't need to execute the notebook first! Just point it at your `.ipynb` file and it does the rest.

---

## Step 1: Install Dependencies (30 seconds)

```bash
# Required
pip install reportlab

# Optional (if your notebook uses these)
pip install matplotlib pandas numpy
```

> **💡 Tip:** If your notebook imports libraries like `matplotlib`, `pandas`, or `numpy`, install them first or nb2pdf will show import errors in the PDF.

## Step 2: Configure Your Info (60 seconds)

Edit `student_info.json`:

```json
{
    "student_name": "Your Name",
    "roll_number": "Your Roll Number",
    "course": "Your Course",
    "assignment": "Your Assignment Title"
}
```

## Step 3: Convert! (5 seconds)

```bash
python nb2pdf.py your_notebook.ipynb
```

**Done!** 🎉 Your PDF is ready.

---

## Example

```bash
# You have: assignment.ipynb
python nb2pdf.py assignment.ipynb

# You get: assignment.pdf (in the same folder)
```

---

## Common Commands

```bash
# Basic
python nb2pdf.py notebook.ipynb

# Custom output name
python nb2pdf.py notebook.ipynb --output MyReport.pdf

# Different config
python nb2pdf.py notebook.ipynb --config team_member_2.json
```

---

## Troubleshooting

**Error: "python is not recognized"**
```bash
# Use full path
C:\Python313\python.exe nb2pdf.py notebook.ipynb
```

**Error: "No module named 'reportlab'"**
```bash
pip install reportlab
```

**Error: "Permission denied"**
- Close the PDF file and try again

---

## Need More Help?

📖 **Full Documentation:** See [USER_GUIDE.md](USER_GUIDE.md)

💬 **Questions:** [GitHub Discussions](https://github.com/ganesh250684/nb2pdf/discussions)

🐛 **Bugs:** [GitHub Issues](https://github.com/ganesh250684/nb2pdf/issues)

---

**Happy PDF-making!** ✨
