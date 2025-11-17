# nb2pdf 📄✨

> **Convert Jupyter Notebooks to Beautiful PDFs in Seconds**

Transform your `.ipynb` files into professional, submission-ready PDF reports with syntax highlighting, formatted tables, and custom headers - all with a single command!

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Ganesh2506/nb2pdf/graphs/commit-activity)

---

## 🎯 The Problem

You've finished your Jupyter notebook assignment. Now what?

- ❌ Jupyter's "Print to PDF" produces ugly, broken results
- ❌ Manual copy-paste to Word takes 30-60 minutes
- ❌ DataFrames print as messy text instead of tables
- ❌ No professional headers or formatting
- ❌ Teachers want PDF submissions, not `.ipynb` files

## ✨ The Solution

```bash
python nb2pdf.py your_notebook.ipynb
```

**Boom!** Professional PDF ready in 5 seconds. ✅

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🎨 **Syntax Highlighting** | VS Code Dark+ color scheme (purple keywords, orange strings, green comments) |
| 📊 **DataFrame Tables** | Pandas DataFrames render as beautiful bordered tables |
| 📝 **Complete Output** | All print statements, outputs, and results preserved |
| 👤 **Custom Headers** | Add your name, ID, project info to every page |
| 📄 **Page Numbers** | Professional footer with page numbering |
| ⚡ **Fast Execution** | Runs all cells and generates PDF in seconds |
| 🎓 **Student-Friendly** | Simple config, clear errors, no complex setup |

---

## 📦 Installation

### Requirements
- Python 3.8 or higher
- pip (Python package manager)

### Quick Install

```bash
# Clone or download this repository
git clone https://github.com/Ganesh2506/nb2pdf.git
cd nb2pdf

# Install dependencies
pip install reportlab

# You're ready!
```

---

## 🎓 Quick Start

### 1. Configure Your Info

Edit `student_info.json` with your details:

```json
{
    "name": "Your Full Name",
    "id": "21f1234567",
    "project_title": "IITM BS Degree - Data Science",
    "project_subtitle": "Mini Project Part A"
}
```

### 2. Convert Your Notebook

```bash
# Basic usage
python nb2pdf.py path/to/your_notebook.ipynb

# Custom output name
python nb2pdf.py notebook.ipynb --output MyReport.pdf

# Different config file
python nb2pdf.py notebook.ipynb --config custom_info.json
```

### 3. Get Your PDF! 🎉

Find your beautifully formatted PDF in the same directory.

---

## 📸 Before & After

### Before (Jupyter's Print to PDF)
- Plain black text (no syntax highlighting)
- DataFrames as ugly text blocks
- No custom headers
- Broken page layouts
- Unprofessional appearance

### After (nb2pdf)
- **Colorful syntax highlighting** - Keywords in purple, strings in orange, comments in green
- **Beautiful tables** - DataFrames with borders, headers, alternating row colors
- **Professional header** - Your name and details on every page
- **Perfect formatting** - Clean page breaks, margins, spacing
- **Submission-ready** - Looks polished and professional

---

## 💡 Use Cases

### 🎓 Students
- Submit assignments in professional PDF format
- Impress teachers with clean, readable reports
- Save hours of manual formatting
- Consistent submissions across group projects

### 👨‍🏫 Educators
- Receive standardized, easy-to-grade submissions
- No need to run students' code
- Clear visibility of code + outputs
- Fair evaluation with consistent formatting

### 💼 Professionals
- Document data analysis projects
- Share work with non-technical stakeholders
- Create portfolio pieces
- Generate client reports

### 🔬 Researchers
- Share reproducible analysis
- Submit supplementary materials
- Document experimental results
- Archive computational work

---

## 🔧 Advanced Usage

### Command Line Options

```bash
# Specify output file
python nb2pdf.py notebook.ipynb --output reports/final_report.pdf

# Use custom student info
python nb2pdf.py notebook.ipynb --config team_member_2.json

# Full paths (if files in different locations)
python /path/to/nb2pdf.py /path/to/notebook.ipynb --output /path/to/output.pdf
```

### Configuration Options

Edit `student_info.json` to customize:

```json
{
    "name": "Jane Doe",
    "id": "21f3001234",
    "project_title": "IITM BS Degree - Data Science and Applications",
    "project_subtitle": "Week 5 Graded Assignment: Library Management System"
}
```

All fields are optional - leave blank if not needed.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

- 🐛 **Report bugs** - Open an issue with details
- 💡 **Suggest features** - Share your ideas
- 📝 **Improve documentation** - Fix typos, add examples
- 🔧 **Submit pull requests** - Add features, fix bugs

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 💖 Support This Project

If nb2pdf saved you hours of work and helped you get better grades, consider supporting its development:

### ☕ Buy Me a Coffee

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow.svg)](https://www.buymeacoffee.com/ganesh2506)

### 💝 Sponsor on GitHub

[![GitHub Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa.svg)](https://github.com/sponsors/Ganesh2506)

### 🌟 Star This Repo

If you can't donate, a ⭐ star helps others discover this tool!

**Your support helps:**
- ✅ Keep the project maintained and updated
- ✅ Add new features (R notebooks, more themes, cloud version)
- ✅ Provide faster bug fixes
- ✅ Create video tutorials
- ✅ Support more notebook formats

---

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

**TL;DR:** Free to use, modify, and distribute. Commercial use allowed. No warranty.

---

## 🙏 Acknowledgments

- Built with [ReportLab](https://www.reportlab.com/) for PDF generation
- Inspired by struggles of IITM BS Degree students
- VS Code color scheme for syntax highlighting
- Community feedback and testing

---

## 📞 Support & Contact

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/Ganesh2506/nb2pdf/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Ganesh2506/nb2pdf/discussions)
- 📧 **Email:** ganesh.kumbhar@example.com *(replace with your email)*
- 🐦 **Twitter:** @ganesh2506 *(if you have Twitter)*

---

## 📊 Stats

- ⭐ **Stars:** Help us reach 100!
- 🍴 **Forks:** Feel free to fork and customize
- 📥 **Downloads:** Track on [releases](https://github.com/Ganesh2506/nb2pdf/releases)
- 👥 **Contributors:** [See all contributors](https://github.com/Ganesh2506/nb2pdf/graphs/contributors)

---

## 🗺️ Roadmap

### Version 1.x (Current)
- ✅ Basic PDF conversion
- ✅ Syntax highlighting
- ✅ DataFrame tables
- ✅ Custom headers

### Version 2.0 (Planned)
- ⏳ R Notebook support
- ⏳ Multiple color themes (Light, Monokai, Solarized)
- ⏳ Batch processing (convert multiple notebooks)
- ⏳ Configuration GUI
- ⏳ Cloud version (web interface)

### Future Ideas
- VS Code extension
- Jupyter Lab extension
- HTML output option
- Template system
- Chart/plot optimization

**Vote on features:** [Feature Requests](https://github.com/Ganesh2506/nb2pdf/discussions/categories/ideas)

---

## 🎓 Educational Impact

**nb2pdf has helped:**
- 🎯 1000+ students save time on assignments *(goal)*
- ⏰ 500+ hours of formatting work eliminated *(goal)*
- 📈 Improved grades through better presentation
- 🌍 Students from 10+ countries *(goal)*

**Share your success story!** [Submit testimonial](https://github.com/Ganesh2506/nb2pdf/discussions/categories/show-and-tell)

---

## ❓ FAQ

<details>
<summary><b>Does this work on Windows/Mac/Linux?</b></summary>
Yes! Works on all platforms with Python 3.8+.
</details>

<details>
<summary><b>Can I use this for commercial projects?</b></summary>
Yes! MIT License allows commercial use.
</details>

<details>
<summary><b>Will it work with large notebooks (100+ cells)?</b></summary>
Yes! Tested with notebooks up to 200 cells.
</details>

<details>
<summary><b>Can I customize the PDF styling?</b></summary>
Currently limited. v2.0 will add theme support. PRs welcome!
</details>

<details>
<summary><b>Does it support R/Julia notebooks?</b></summary>
Not yet. Python only for now. R support planned for v2.0.
</details>

<details>
<summary><b>Is my code executed during conversion?</b></summary>
Yes! All cells are executed fresh to ensure outputs match code.
</details>

---

## 🏆 Hall of Fame

**Top Contributors:** *(will be updated)*
- 🥇 [@ganesh2506](https://github.com/Ganesh2506) - Creator
- 🥈 *Your name here!* - First contributor

**Special Thanks:**
- All IITM students who tested early versions
- Everyone who reported bugs and suggested features
- Coffee ☕ for keeping me awake during development

---

<div align="center">

**Made with ❤️ for students, by students**

[⬆ Back to Top](#nb2pdf-)

</div>
