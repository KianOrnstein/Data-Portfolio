# Data Folder - Easy Updates

Tất cả thông tin có thể update đều nằm trong folder này. Chỉ cần chỉnh sửa các file JSON và push lên GitHub, website sẽ tự động cập nhật!

## 📁 Các File

### `profile.json`
Thông tin cá nhân:
- Tên (mặc định và thay thế)
- Email
- Social links (LinkedIn, GitHub, Blogger, ...)
- Metrics (số liệu thống kê)
- About me content

### `projects.json`
Danh sách dự án:
- Thêm/xóa/sửa projects
- Tech stack, descriptions, categories
- External URLs (Blogger/Substack links)

### `experiences.json`
Kinh nghiệm làm việc:
- Thêm/xóa/sửa experiences
- Thông tin công ty, vị trí, thời gian
- Hỗ trợ cả tiếng Việt và tiếng Anh

## 🔄 Cách Update

1. Mở file JSON cần chỉnh sửa
2. Update thông tin
3. Lưu file
4. Commit và push:
   ```bash
   git add data/
   git commit -m "Update profile"
   git push
   ```
5. Website tự động cập nhật sau 2-3 phút!

## ⚠️ Lưu ý

- **JSON phải valid**: Kiểm tra syntax trước khi commit
- **Dấu phẩy**: Đảm bảo dấu phẩy đúng vị trí
- **Dấu ngoặc kép**: Strings phải có dấu ngoặc kép `"..."`

## 📖 Xem thêm

- `UPDATE_GUIDE.md` - Hướng dẫn chi tiết từng loại update
- `GITHUB_PAGES_SETUP.md` - Hướng dẫn deploy

