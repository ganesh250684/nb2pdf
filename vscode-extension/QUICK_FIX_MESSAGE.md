# 🚨 Quick Fix for nb2pdf Extension Users

## Problem
Getting error: **"nb2pdf.py script error! Please reinstall the extension"** ❌

## Solution
**You don't need to reinstall!** The issue is a missing Python library, not the extension.

### ✅ Fix in 30 Seconds:

1. **Open Terminal** (in VS Code or PowerShell/Command Prompt)

2. **Run this command:**
   ```bash
   pip install reportlab
   ```

3. **Reload VS Code** (Press `Ctrl+Shift+P` → type "Reload Window" → Enter)

4. **Try converting again!** 🎉

---

## Alternative Commands

If the above doesn't work, try:

```bash
python -m pip install reportlab
```

OR (if using Python 3 specifically):
```bash
python3 -m pip install reportlab
```

---

## Verify Installation

After installing, verify it worked:
```bash
python -c "import reportlab; print('✅ Success!')"
```

You should see: `✅ Success!`

---

## Still Not Working?

### For Windows Users:
```powershell
pip install --user reportlab
```

### For Mac/Linux Users:
```bash
sudo pip install reportlab
```

OR use a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install reportlab
```

---

## 🎯 Updated Extension Available!

**Good news!** Version 1.1.0 fixes this confusing error message.

The new version:
- ✅ Checks for reportlab BEFORE trying to convert
- ✅ Shows clear error: "Missing required library: reportlab"
- ✅ Offers "Install Now" button to auto-install
- ✅ Provides step-by-step installation guide

### Update Now:
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "nb2pdf"
4. Click "Update" if available

OR use Command Palette:
- Press `Ctrl+Shift+P`
- Type: "nb2pdf: Check Dependencies"
- Run it to see if everything is working

---

## Need More Help?

- **Full Troubleshooting Guide**: https://github.com/ganesh250684/nb2pdf/blob/main/EXTENSION_ERROR_FIX.md
- **Report Issue**: https://github.com/ganesh250684/nb2pdf/issues
- **Documentation**: https://github.com/ganesh250684/nb2pdf#readme

---

**Share this with classmates who are getting the same error!** 🤝
