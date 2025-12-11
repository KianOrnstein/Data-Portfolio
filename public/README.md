# Public Folder - Images

## Profile Image

Đặt ảnh profile của bạn vào đây với tên file: `profile.jpg`

### Yêu cầu:
- Tên file: `profile.jpg` (hoặc `profile.png`)
- Kích thước khuyến nghị: ít nhất 800x800px (ảnh vuông)
- Format: JPG hoặc PNG
- Nên là ảnh chân dung, rõ ràng, chất lượng cao

### Cách đặt:
1. Đổi tên ảnh của bạn thành `profile.jpg` (hoặc `profile.png`)
2. Copy ảnh vào thư mục `public/`
3. Nếu dùng PNG, cập nhật đường dẫn trong `components/Hero.tsx` từ `/profile.jpg` thành `/profile.png`

### Lưu ý:
- Ảnh sẽ được hiển thị dạng hình tròn
- Next.js sẽ tự động optimize ảnh
- Nếu chưa có ảnh, bạn có thể tạm thời comment phần Image trong Hero.tsx

