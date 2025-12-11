# 🚀 Hướng dẫn Deploy lên GitHub Pages - Quick Start

## Bước 1: Chuẩn bị Repository

1. **Tạo repository mới trên GitHub** (nếu chưa có):
   - Vào https://github.com/new
   - Đặt tên repository (ví dụ: `professional-portfolio`)
   - Chọn **Public** (GitHub Pages miễn phí chỉ cho public repos)
   - **KHÔNG** tích "Initialize with README"

2. **Push code lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Bước 2: Cấu hình GitHub Pages

1. **Vào Settings của repository**:
   - Click vào tab **Settings** trong repository
   - Scroll xuống phần **Pages** (bên trái menu)

2. **Cấu hình Source**:
   - **Source**: Chọn **GitHub Actions**
   - Lưu lại

## Bước 3: Kích hoạt GitHub Actions

1. **Kiểm tra workflow file**:
   - File `.github/workflows/deploy.yml` đã được tạo sẵn
   - Workflow sẽ tự động chạy khi bạn push code lên branch `main`

2. **Push code để trigger deployment**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Kiểm tra deployment**:
   - Vào tab **Actions** trong repository
   - Bạn sẽ thấy workflow "Deploy to GitHub Pages" đang chạy
   - Đợi khoảng 2-5 phút để build và deploy hoàn tất

## Bước 4: Truy cập Website

Sau khi deployment thành công:
- URL của bạn sẽ là: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- Hoặc nếu bạn đã set custom domain: URL của domain đó

## ⚠️ Lưu ý quan trọng

### Nếu repository name KHÔNG phải `username.github.io`:
- Website sẽ có URL: `https://username.github.io/repo-name/`
- **KHÔNG CẦN** thay đổi gì trong code, hệ thống đã tự động xử lý

### Nếu repository name LÀ `username.github.io`:
- Website sẽ có URL: `https://username.github.io/`
- Cần sửa `next.config.js`:
  ```javascript
  basePath: '', // Để trống
  ```

### Kiểm tra Build Locally (Tùy chọn):

Trước khi push, bạn có thể test build:
```bash
npm run build:static
```

Sau khi build xong, kiểm tra folder `out/` đã được tạo.

## 🔄 Update Website

Mỗi khi bạn muốn update website:
1. Sửa code
2. Commit và push:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```
3. GitHub Actions sẽ tự động build và deploy lại

## 📝 Checklist trước khi deploy

- [ ] Đã push code lên GitHub
- [ ] Đã cấu hình GitHub Pages source = "GitHub Actions"
- [ ] Đã kiểm tra file `.github/workflows/deploy.yml` tồn tại
- [ ] Đã đặt CV PDF vào `public/cv/` (nếu có)
- [ ] Đã đặt profile image vào `public/profile.jpg`
- [ ] Đã cập nhật thông tin trong `data/profile.json`
- [ ] Đã test build local: `npm run build:static`

## 🆘 Troubleshooting

### Build failed:
- Kiểm tra tab **Actions** để xem lỗi chi tiết
- Đảm bảo tất cả dependencies đã được install
- Kiểm tra `package.json` có script `build:static`

### 404 Not Found:
- Đợi 5-10 phút sau khi deploy (có thể cần thời gian propagate)
- Kiểm tra URL có đúng format không
- Kiểm tra Settings > Pages > Source đã set "GitHub Actions"

### Website không hiển thị đúng:
- Xóa cache browser (Ctrl+Shift+Delete)
- Kiểm tra console browser để xem lỗi
- Đảm bảo `basePath` trong `next.config.js` đúng với repo name

## 📚 Tài liệu tham khảo

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- File `GITHUB_PAGES_SETUP.md` để xem hướng dẫn chi tiết hơn

---

**Chúc bạn deploy thành công! 🎉**

