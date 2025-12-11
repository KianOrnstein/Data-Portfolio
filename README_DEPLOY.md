# 🚀 Quick Start - Deploy to GitHub Pages

## Setup trong 5 phút

### 1. Tạo Repository trên GitHub
```bash
# Tạo repo mới trên GitHub, sau đó:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Bật GitHub Pages
1. Vào **Settings** > **Pages**
2. **Source**: Chọn **GitHub Actions**
3. Lưu lại

### 3. Xong! 🎉
- Mỗi lần push code, website tự động deploy
- URL: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Update Thông Tin

Chỉ cần chỉnh sửa các file trong `data/`:
- `data/profile.json` - Thông tin cá nhân
- `data/projects.json` - Dự án
- `data/experiences.json` - Kinh nghiệm

Sau đó:
```bash
git add .
git commit -m "Update profile"
git push
```

Website tự động cập nhật sau 2-3 phút!

## Xem chi tiết

- `GITHUB_PAGES_SETUP.md` - Hướng dẫn chi tiết
- `UPDATE_GUIDE.md` - Hướng dẫn update từng loại thông tin

