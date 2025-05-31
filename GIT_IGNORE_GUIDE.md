# Git Ignore Guide - Recipe Generation Project

## 🚫 What Files Are Being Ignored

This project uses a comprehensive `.gitignore` file to exclude sensitive, large, and unnecessary files from version control.

## 📁 Critical Exclusions

### 🔴 Large Model Files (MOST IMPORTANT)
```
Foodimg2Ing/data/modelbest.ckpt     # 396MB - Main AI model
Foodimg2Ing/data/ingr_vocab.pkl     # 30KB - Ingredients vocabulary  
Foodimg2Ing/data/instr_vocab.pkl    # 454KB - Instructions vocabulary
```
**Why excluded**: These files are too large for git and would make the repository unusable.

### 🔒 User Uploaded Content
```
Foodimg2Ing/static/images/demo_imgs/*
```
**Why excluded**: User-uploaded images may contain personal/sensitive content and can be large.

### 🐍 Python Environment Files
```
__pycache__/
*.pyc
venv/
.env
```
**Why excluded**: These are generated files and environment-specific configurations.

## ✅ What IS Tracked

- ✅ Source code (`.py` files)
- ✅ HTML templates
- ✅ CSS and JavaScript files
- ✅ Configuration files (`requirements.txt`)
- ✅ Documentation files
- ✅ Sample images (the original ones in `static/images/`)
- ✅ Directory structure (via `.gitkeep` files)

## 🔧 How to Handle Model Files

Since the model files are ignored, new users will need to:

1. **Download the model files manually** from the original sources:
   - [modelbest.ckpt](https://dl.fbaipublicfiles.com/inversecooking/modelbest.ckpt)
   - [ingr_vocab.pkl](https://dl.fbaipublicfiles.com/inversecooking/ingr_vocab.pkl)
   - [instr_vocab.pkl](https://dl.fbaipublicfiles.com/inversecooking/instr_vocab.pkl)

2. **Place them in**: `Foodimg2Ing/data/`

3. **Or use Git LFS** (Large File Storage) if you want to track them:
   ```bash
   git lfs track "*.ckpt"
   git lfs track "*.pkl"
   ```

## 🛠️ Customizing the .gitignore

To modify what's ignored:

1. **Add more exclusions**: Edit `.gitignore` and add new patterns
2. **Stop ignoring something**: Remove the line from `.gitignore`
3. **Force add an ignored file**: Use `git add -f filename`

## 📊 Repository Size Impact

**Without .gitignore**: ~400MB+ (unusable for most git hosting)
**With .gitignore**: ~10-20MB (manageable and fast)

## 🔍 Check What's Ignored

```bash
# See what files are being ignored
git status --ignored

# Check if a specific file is ignored
git check-ignore filename

# See all tracked files
git ls-files
```

---

**Remember**: The `.gitignore` file itself IS tracked, so everyone gets the same ignore rules! 🎯 