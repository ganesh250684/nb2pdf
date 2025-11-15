# 🐛 Troubleshooting: "nb2pdf.py script error! Please reinstall the extension"

## ❌ Error You're Seeing

```
nb2pdf.py script error! Please reinstall the extension.
Source: nb2pdf - Notebook to PDF
```

## 🎯 Root Cause

The VS Code extension is installed, but **Python dependencies are missing**.

The extension needs:
1. ✅ Python installed
2. ❌ **`reportlab` library** (likely missing!)
3. ✅ VS Code with Jupyter extension

## ✅ Quick Fix (2 minutes)

### Step 1: Install the Missing Library

Open a terminal and run:

```powershell
# Windows PowerShell
pip install reportlab

# OR if you have multiple Python versions
python -m pip install reportlab

# OR using python3
python3 -m pip install reportlab
```

### Step 2: Reload VS Code

After installing:
1. Press `Ctrl+Shift+P`
2. Type: "Reload Window"
3. Press Enter

### Step 3: Try Again

1. Open your notebook
2. Right-click → "Convert Notebook to PDF"
3. Should work now! ✨

---

## 🔍 Detailed Troubleshooting

### Issue 1: "pip is not recognized"

**Problem:** Python/pip not in PATH

**Solutions:**

```powershell
# Option A: Use full path to pip
C:\Python313\Scripts\pip.exe install reportlab

# Option B: Use python -m pip
python -m pip install reportlab

# Option C: Add Python to PATH
# 1. Search "Environment Variables" in Windows
# 2. Edit PATH
# 3. Add: C:\Python313\ and C:\Python313\Scripts\
```

### Issue 2: "Could not find Python"

**Problem:** Python not installed

**Solution:**
1. Download Python from https://python.org
2. **Check "Add Python to PATH"** during installation
3. Restart VS Code
4. Run: `pip install reportlab`

### Issue 3: Multiple Python Versions

**Problem:** reportlab installed in wrong Python version

**Solution:**

```powershell
# Find which Python VS Code is using
# In VS Code terminal:
python --version
python -c "import sys; print(sys.executable)"

# Install reportlab for THAT specific Python
C:\Path\To\That\Python\python.exe -m pip install reportlab
```

### Issue 4: Permission Denied

**Problem:** Need admin rights

**Solution:**

```powershell
# Run PowerShell as Administrator
# Then:
pip install reportlab

# OR install for current user only
pip install --user reportlab
```

### Issue 5: Extension Still Fails

**Problem:** Cache or corrupted installation

**Solution:**

1. **Uninstall Extension:**
   - Extensions sidebar (Ctrl+Shift+X)
   - Search "nb2pdf"
   - Click Uninstall

2. **Verify reportlab:**
   ```powershell
   python -c "import reportlab; print('✅ reportlab installed')"
   ```

3. **Reinstall Extension:**
   - Extensions sidebar
   - Search "nb2pdf"
   - Install again

4. **Reload VS Code:**
   - Ctrl+Shift+P → "Reload Window"

---

## 🆚 Extension vs Python Script

### You Have 2 Options:

#### **Option A: VS Code Extension** (What you installed)
- ✅ Right-click menu in VS Code
- ✅ GUI buttons and dialogs
- ✅ Integrated into VS Code
- ❌ Requires: VS Code + Python + reportlab

**Use this if:** You work in VS Code and want convenience

#### **Option B: Python Script** (Alternative)
- ✅ Works anywhere (terminal, scripts, automation)
- ✅ No VS Code needed
- ✅ Simpler to debug
- ❌ No GUI (command-line only)

**Use this if:** You want flexibility or VS Code has issues

---

## 📦 Verify Installation

### Check 1: Python Works

```powershell
python --version
# Expected: Python 3.8.0 or higher
```

### Check 2: reportlab Installed

```powershell
python -c "import reportlab; print('✅ Works!')"
# Expected: ✅ Works!

# If error:
pip install reportlab
```

### Check 3: Extension Loaded

1. Open Command Palette (Ctrl+Shift+P)
2. Type: "nb2pdf"
3. Should see:
   - "Convert Notebook to PDF"
   - "Convert to PDF with Custom Name"
   - "Configure Student Information"

---

## 🎓 For Your Classmates

If sharing with classmates, tell them:

### **Installation Instructions:**

1. **Install Python** (if not already)
   - https://python.org/downloads
   - ✅ Check "Add Python to PATH"

2. **Install reportlab:**
   ```powershell
   pip install reportlab
   ```

3. **Install VS Code Extension:**
   - Open VS Code
   - Extensions sidebar (Ctrl+Shift+X)
   - Search: "nb2pdf"
   - Install by ganeshkumbhar

4. **Configure Your Info:**
   - Ctrl+Shift+P
   - "nb2pdf: Configure Student Information"
   - Fill in your details

5. **Use It:**
   - Open .ipynb file
   - Right-click → "Convert Notebook to PDF"
   - Done! ✨

---

## 📊 Common Error Messages & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "script error" | Missing reportlab | `pip install reportlab` |
| "pip not recognized" | Python not in PATH | Use full path or add to PATH |
| "Permission denied" | Need admin | Run as admin or `pip install --user` |
| "No module named reportlab" | Wrong Python version | Install for correct Python |
| "Extension not found" | Not installed | Install from marketplace |

---

## 🔄 Alternative: Use Python Script Directly

If the extension keeps failing, use the standalone script:

```powershell
# Download nb2pdf.py from GitHub
# Or from the nb2pdf folder

# Run directly:
python nb2pdf.py your_notebook.ipynb

# With options:
python nb2pdf.py notebook.ipynb --output Report.pdf
```

**Advantage:** Easier to debug, see exact error messages

---

## 💬 Still Not Working?

### Collect This Info:

```powershell
# 1. Python version
python --version

# 2. Where is Python?
python -c "import sys; print(sys.executable)"

# 3. Is reportlab installed?
pip list | findstr reportlab

# 4. VS Code version
# Help → About

# 5. Extension version
# Extensions → nb2pdf → Version number
```

### Then:
- Post on GitHub Issues: https://github.com/Ganesh2506/nb2pdf/issues
- Or contact: ganesh.kumbhar@example.com
- Include all the info above

---

## ✅ Success Checklist

- [ ] Python 3.8+ installed
- [ ] `python --version` works in terminal
- [ ] `pip install reportlab` completed
- [ ] `python -c "import reportlab"` works (no error)
- [ ] VS Code reloaded (Ctrl+Shift+P → Reload Window)
- [ ] nb2pdf extension installed
- [ ] Can see "Convert Notebook to PDF" in right-click menu

**All checked?** It should work now! 🎉

---

<div align="center">

**Still stuck? Ask for help!**

[GitHub Issues](https://github.com/Ganesh2506/nb2pdf/issues) | [Email Support](mailto:ganesh.kumbhar@example.com)

</div>
