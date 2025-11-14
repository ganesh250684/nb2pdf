# Contributing to nb2pdf 🤝

First off, thank you for considering contributing to nb2pdf! It's people like you that make this tool better for students worldwide.

## 🌟 Ways to Contribute

### 1. 🐛 Report Bugs

Found a bug? Help us fix it!

**Before submitting:**
- Check if the issue already exists in [Issues](https://github.com/Ganesh2506/nb2pdf/issues)
- Try the latest version
- Collect error messages and screenshots

**Submit a bug report:**
1. Go to [Issues → New Issue](https://github.com/Ganesh2506/nb2pdf/issues/new)
2. Use the "Bug Report" template
3. Include:
   - Python version (`python --version`)
   - Operating system (Windows/Mac/Linux)
   - Full error message
   - Minimal example notebook that reproduces the issue
   - What you expected to happen

### 2. 💡 Suggest Features

Have an idea? We'd love to hear it!

**Feature request checklist:**
- Is it useful for multiple users?
- Does it align with the project's goals?
- Can you help implement it?

**Submit a feature request:**
1. Go to [Discussions → Ideas](https://github.com/Ganesh2506/nb2pdf/discussions/categories/ideas)
2. Describe the problem it solves
3. Explain your proposed solution
4. Share examples or mockups if applicable

### 3. 📝 Improve Documentation

Documentation is crucial! You can help by:
- Fixing typos and grammar
- Adding examples
- Improving clarity
- Translating to other languages
- Creating video tutorials

### 4. 🔧 Submit Code

Want to fix a bug or add a feature?

## 🚀 Development Setup

### Prerequisites
```bash
# Python 3.8+
python --version

# Git
git --version
```

### Setup Your Environment

```bash
# 1. Fork the repository on GitHub

# 2. Clone YOUR fork
git clone https://github.com/YOUR_USERNAME/nb2pdf.git
cd nb2pdf

# 3. Add upstream remote
git remote add upstream https://github.com/Ganesh2506/nb2pdf.git

# 4. Create a branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description

# 5. Install dependencies
pip install reportlab

# 6. Make your changes

# 7. Test thoroughly
python nb2pdf.py test_notebook.ipynb
```

### Code Style

- **Python Style:** Follow [PEP 8](https://pep8.org/)
- **Docstrings:** Use clear, descriptive docstrings
- **Comments:** Explain WHY, not WHAT
- **Naming:** Descriptive variable/function names

**Example:**
```python
def syntax_highlight_python(code):
    """Apply VS Code-style syntax highlighting to Python code.
    
    Args:
        code (str): Raw Python code to highlight
        
    Returns:
        str: HTML-formatted code with font color tags
    """
    # Implementation here
```

### Commit Messages

Use clear, descriptive commit messages:

**Good:**
```
✨ Add support for dark mode theme
🐛 Fix DataFrame table rendering for empty cells
📝 Update installation instructions for Windows
♻️ Refactor syntax highlighting for better performance
```

**Bad:**
```
fixed stuff
update
changes
asdf
```

**Emoji Guide:**
- ✨ `:sparkles:` - New feature
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Documentation
- ♻️ `:recycle:` - Refactoring
- 🚀 `:rocket:` - Performance improvement
- 🎨 `:art:` - UI/Styling changes
- ✅ `:white_check_mark:` - Tests

### Testing Your Changes

Before submitting:

1. **Test with different notebooks:**
   - Simple notebook (5-10 cells)
   - Complex notebook (50+ cells)
   - Notebook with errors
   - Notebook with DataFrames
   - Notebook with plots

2. **Test on different scenarios:**
   - Fresh installation
   - Different Python versions (if possible)
   - Different operating systems (if possible)

3. **Check for errors:**
   ```bash
   # Run your test notebook
   python nb2pdf.py test_cases/simple.ipynb
   
   # Check the generated PDF
   # Verify no errors in console
   ```

### Pull Request Process

1. **Update Documentation**
   - Update README.md if adding features
   - Update USER_GUIDE.md if changing usage
   - Add comments to complex code

2. **Create Pull Request**
   ```bash
   # Push your branch
   git push origin feature/your-feature-name
   
   # Go to GitHub and create PR
   ```

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   
   ## Testing
   - [ ] Tested with simple notebooks
   - [ ] Tested with complex notebooks
   - [ ] Tested error handling
   
   ## Screenshots (if applicable)
   Before/after comparison
   ```

4. **Code Review**
   - Be patient - reviews may take a few days
   - Address feedback professionally
   - Make requested changes
   - Update PR as needed

## 📋 Coding Guidelines

### File Organization

```
nb2pdf/
├── nb2pdf.py           # Main tool
├── student_info.json   # Config template
├── README.md           # Main documentation
├── USER_GUIDE.md       # Detailed user guide
├── CONTRIBUTING.md     # This file
├── LICENSE             # MIT License
└── examples/           # Example notebooks (future)
```

### Adding New Features

1. **Plan First**
   - Discuss in Issues/Discussions
   - Get feedback before coding
   - Consider edge cases

2. **Implement**
   - Write clean, readable code
   - Add docstrings
   - Handle errors gracefully

3. **Document**
   - Update README.md
   - Add usage examples
   - Update changelog

4. **Test**
   - Test thoroughly
   - Include edge cases
   - Verify on different systems

## 🎯 Priority Areas

We especially need help with:

1. **Testing**
   - Test on Mac/Linux (currently tested on Windows)
   - Test with Python 3.8, 3.9, 3.10, 3.11, 3.12
   - Edge case testing

2. **Features**
   - R Notebook support
   - Multiple color themes
   - Batch processing
   - Configuration GUI

3. **Documentation**
   - Video tutorials
   - More examples
   - Troubleshooting guide expansion
   - Translations (Hindi, Spanish, etc.)

4. **Performance**
   - Optimize for large notebooks (200+ cells)
   - Reduce PDF file size
   - Faster execution

## 💬 Communication

- **Questions?** → [GitHub Discussions](https://github.com/Ganesh2506/nb2pdf/discussions)
- **Bug?** → [GitHub Issues](https://github.com/Ganesh2506/nb2pdf/issues)
- **Feature idea?** → [Discussions → Ideas](https://github.com/Ganesh2506/nb2pdf/discussions/categories/ideas)
- **Chat?** → *(Discord/Slack link if you create one)*

## 🏆 Recognition

Contributors will be:
- Listed in README.md Hall of Fame
- Mentioned in release notes
- Given credit in documentation

**Top contributors may receive:**
- Special thanks in README
- Maintainer status (if interested)
- Swag/stickers (if we get sponsorship)

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, experience level, nationality, personal appearance, race, religion, or sexual identity.

### Our Standards

**Positive behavior:**
- ✅ Being respectful and inclusive
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what's best for the community
- ✅ Showing empathy towards others

**Unacceptable behavior:**
- ❌ Harassment, trolling, or insulting comments
- ❌ Personal or political attacks
- ❌ Public or private harassment
- ❌ Publishing others' private information

### Enforcement

Violations should be reported to ganesh.kumbhar@example.com. All reports will be reviewed and investigated.

## 🎓 Learning Resources

New to open source?

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Timers Only](https://www.firsttimersonly.com/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)

## ❓ FAQ

**Q: I'm a beginner. Can I contribute?**
A: Absolutely! Start with documentation, fixing typos, or testing. Everyone was a beginner once!

**Q: How long until my PR is reviewed?**
A: Usually within 3-7 days. Be patient!

**Q: My PR was rejected. What now?**
A: Don't be discouraged! Read the feedback, learn, and try again.

**Q: Can I add my name to the README?**
A: If your contribution is merged, yes! Add yourself to the contributors list.

**Q: Do I need to sign a CLA?**
A: No! This project uses the MIT License, no CLA required.

---

## 🙏 Thank You!

Your contributions make nb2pdf better for thousands of students worldwide. Whether it's a bug report, feature suggestion, or pull request - thank you for helping! 🎉

**Happy Contributing!** 🚀

---

<div align="center">

[⬆ Back to Top](#contributing-to-nb2pdf-)

</div>
