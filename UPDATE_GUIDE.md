# Hướng dẫn Update Thông Tin Portfolio

Tất cả thông tin có thể update đều được lưu trong các file JSON trong folder `data/`. Chỉ cần chỉnh sửa các file này và push lên GitHub, website sẽ tự động cập nhật.

## 📝 Các File Có Thể Update

### 1. `data/profile.json` - Thông tin cá nhân

```json
{
  "name": {
    "default": {
      "vn": "Phạm Đức Kiên",      // Tên mặc định tiếng Việt
      "en": "Kien Duc Pham"        // Tên mặc định tiếng Anh
    },
    "alternatives": {
      "vn": ["Kian Pham", "..."],  // Tên thay thế tiếng Việt
      "en": ["Kian Pham", "..."]   // Tên thay thế tiếng Anh
    }
  },
  "email": "your-email@example.com",
  "socialLinks": [
    {
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/...",
      "icon": "💼"
    }
  ],
  "metrics": [
    {
      "label": {
        "vn": "Dự án hoàn thành",
        "en": "Projects Completed"
      },
      "value": 24,
      "suffix": "+"
    }
  ],
  "about": {
    "vn": {
      "title": "Về tôi",
      "content": "Nội dung về bạn..."
    },
    "en": {
      "title": "About Me",
      "content": "Your content here..."
    }
  }
}
```

### 2. `data/projects.json` - Dự án

```json
[
  {
    "title": "Tên dự án",
    "description": "Mô tả ngắn",
    "tech": ["Python", "React", "..."],
    "category": "Data Science",
    "slug": "project-slug",
    "externalUrl": "https://..." // Tùy chọn
  }
]
```

**Lưu ý:**
- Thêm project mới: Thêm object vào array
- Xóa project: Xóa object khỏi array
- Sửa project: Chỉnh sửa object

### 3. `data/experiences.json` - Kinh nghiệm

```json
{
  "vn": [
    {
      "period": "Hiện tại",
      "title": "Vị trí",
      "company": "Tên công ty",
      "description": "Mô tả công việc",
      "location": "Địa điểm"
    }
  ],
  "en": [
    {
      "period": "Present",
      "title": "Position",
      "company": "Company Name",
      "description": "Job description",
      "location": "Location"
    }
  ]
}
```

## 🖼️ Các File Media

### Profile Image
- **Vị trí**: `public/profile.jpg` hoặc `public/profile.png`
- **Kích thước**: Khuyến nghị 800x800px (vuông)
- **Format**: JPG hoặc PNG

### CV/Resume
- **Vị trí**: `public/cv/`
- **Tên file**: `cv.pdf`, `resume.pdf`, hoặc bất kỳ tên PDF nào
- **Lưu ý**: Chỉ đặt 1 file PDF trong folder này

## 📄 Blog Posts

### Thêm bài blog mới
1. Copy `content/blog/BLOG_TEMPLATE.md`
2. Đổi tên thành slug của bạn (ví dụ: `my-new-post.md`)
3. Điền frontmatter:
   ```yaml
   ---
   title: "Tiêu đề bài viết"
   date: "2024-12-20"
   excerpt: "Tóm tắt ngắn"
   category: "Python Tips"
   tags: ["tag1", "tag2"]
   externalUrl: "https://your-blog-url.com" # Tùy chọn
   preview: "Nội dung preview..."
   ---
   ```
4. Viết nội dung bên dưới

## 🔄 Quy trình Update

1. **Chỉnh sửa** các file JSON hoặc thêm content
2. **Test local** (tùy chọn):
   ```bash
   npm run dev
   ```
3. **Commit và Push**:
   ```bash
   git add .
   git commit -m "Update: [Mô tả thay đổi]"
   git push
   ```
4. **GitHub Actions tự động deploy** (2-3 phút)
5. **Website tự động cập nhật**

## ✅ Checklist Update

- [ ] Profile info (`data/profile.json`)
- [ ] Projects (`data/projects.json`)
- [ ] Experiences (`data/experiences.json`)
- [ ] Profile image (`public/profile.jpg`)
- [ ] CV (`public/cv/cv.pdf`)
- [ ] Blog posts (`content/blog/*.md`)

## 💡 Tips

- Luôn backup trước khi update
- Test local trước khi push (nếu có thể)
- Commit message rõ ràng để dễ track
- JSON phải valid (dùng JSON validator nếu cần)
- Không xóa các field bắt buộc trong JSON

## 🐛 Troubleshooting

### JSON Syntax Error
- Dùng JSON validator online
- Kiểm tra dấu phẩy, ngoặc
- Đảm bảo strings có dấu ngoặc kép

### Website không update
- Kiểm tra GitHub Actions đã chạy chưa
- Xem logs trong Actions tab
- Đợi vài phút sau khi deploy

### Images không hiển thị
- Kiểm tra file có trong `public/` chưa
- Kiểm tra tên file đúng chưa
- Clear browser cache

