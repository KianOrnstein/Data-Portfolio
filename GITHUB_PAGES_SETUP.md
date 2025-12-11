# Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Chuẩn bị Repository

1. Tạo repository mới trên GitHub (hoặc sử dụng repository hiện tại)
2. Push code lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Bước 2: Cấu hình GitHub Pages

1. Vào **Settings** của repository
2. Scroll xuống phần **Pages**
3. Trong **Source**, chọn **GitHub Actions**
4. Lưu lại

## Bước 3: Tự động Deploy

Sau khi push code lên branch `main`, GitHub Actions sẽ tự động:
- Build static site
- Deploy lên GitHub Pages
- Website sẽ có tại: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Bước 4: Custom Domain (Tùy chọn)

Nếu bạn có custom domain:
1. Vào **Settings > Pages**
2. Nhập domain của bạn vào **Custom domain**
3. Cập nhật `BASE_PATH` trong `.github/workflows/deploy.yml` nếu cần

## Cách Update Thông Tin

### Update Profile
Chỉnh sửa file `data/profile.json`:
- Tên, email, social links
- Metrics (số liệu thống kê)
- About me content

### Update Projects
Chỉnh sửa file `data/projects.json`:
- Thêm/xóa/sửa projects
- Cập nhật tech stack, descriptions

### Update Experiences
Chỉnh sửa file `data/experiences.json`:
- Thêm/xóa/sửa experiences
- Cập nhật thông tin công việc

### Update Blog Posts
Thêm file `.md` mới vào `content/blog/`:
- Copy từ `BLOG_TEMPLATE.md`
- Điền thông tin frontmatter
- Viết nội dung

### Update CV
Đặt file PDF vào `public/cv/`:
- Tên file: `cv.pdf`, `resume.pdf`, hoặc bất kỳ tên PDF nào

### Update Profile Image
Đặt ảnh vào `public/`:
- Tên file: `profile.jpg` hoặc `profile.png`

## Workflow

1. **Chỉnh sửa** các file JSON trong `data/` hoặc thêm content mới
2. **Commit và Push** lên GitHub:
   ```bash
   git add .
   git commit -m "Update profile information"
   git push
   ```
3. **GitHub Actions tự động build và deploy** (mất khoảng 2-3 phút)
4. **Website tự động cập nhật** trên GitHub Pages

## Lưu ý

- Tất cả thông tin có thể update đều nằm trong folder `data/`
- Không cần chạy build local, GitHub Actions sẽ tự động làm
- Mỗi lần push code, website sẽ tự động rebuild và deploy
- Static site nên load rất nhanh

## Troubleshooting

### Build fails
- Kiểm tra syntax JSON trong các file `data/*.json`
- Kiểm tra logs trong **Actions** tab trên GitHub

### Website không hiển thị
- Kiểm tra **Settings > Pages** đã bật chưa
- Kiểm tra URL có đúng format không
- Đợi vài phút sau khi deploy xong

### Images không load
- Đảm bảo images nằm trong folder `public/`
- Kiểm tra đường dẫn trong code

