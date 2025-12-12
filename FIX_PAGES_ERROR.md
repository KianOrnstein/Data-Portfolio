# 🔧 Fix: GitHub Pages Not Enabled Error

## Lỗi
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled
```

## Nguyên nhân
GitHub Pages chưa được enable trong repository settings.

## Cách sửa

### Cách 1: Enable qua GitHub Web Interface (Khuyến nghị)

1. **Vào repository trên GitHub**
   - Mở repository của bạn trên GitHub

2. **Vào Settings**
   - Click tab **Settings** (ở trên cùng, bên cạnh Code, Issues, etc.)

3. **Tìm phần Pages**
   - Scroll xuống trong menu bên trái, tìm **Pages**
   - Hoặc truy cập trực tiếp: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages`

4. **Enable GitHub Pages**
   - Trong phần **Source**, chọn **GitHub Actions**
   - Nếu không thấy option này:
     - Thử chọn **"Deploy from a branch"** trước
     - Chọn branch: **main**
     - Chọn folder: **/ (root)**
     - Click **Save**
     - Sau đó đổi lại thành **GitHub Actions**

5. **Kiểm tra**
   - Bạn sẽ thấy message: "Your site is ready to be published" hoặc tương tự
   - Có thể có warning về chưa có deployment, đó là bình thường

6. **Re-run workflow**
   - Vào tab **Actions**
   - Tìm workflow run bị lỗi
   - Click **Re-run all jobs**

### Cách 2: Sử dụng GitHub CLI (Nếu có)

```bash
gh api repos/:owner/:repo/pages -X POST -f source='{"branch":"main","path":"/"}'
```

### Cách 3: Enable qua API (Advanced)

Nếu bạn có quyền admin, có thể dùng GitHub API:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/pages \
  -d '{"source":{"branch":"main","path":"/"}}'
```

## Sau khi enable

1. **Commit và push lại** (nếu cần):
   ```bash
   git add .
   git commit -m "Update workflow"
   git push origin main
   ```

2. **Hoặc re-run workflow**:
   - Vào tab **Actions**
   - Click vào workflow run
   - Click **Re-run all jobs**

3. **Đợi deployment**:
   - Workflow sẽ chạy lại
   - Sau 2-5 phút, website sẽ live

## Kiểm tra

Sau khi enable và workflow chạy thành công:
- URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- Hoặc check trong Settings > Pages > bạn sẽ thấy URL

## Lưu ý

- Repository phải là **Public** (hoặc bạn có GitHub Pro/Team)
- Bạn phải có quyền **Admin** hoặc **Maintain** trên repository
- Nếu vẫn lỗi, đợi vài phút và thử lại (GitHub có thể cần thời gian để enable)

## Troubleshooting

### Vẫn không thấy option "GitHub Actions"?
- Đảm bảo repository là Public
- Kiểm tra bạn có quyền admin
- Thử refresh trang

### "Pages is disabled"?
- Repository có thể chưa được enable Pages
- Thử enable qua cách 1 trước

### Workflow vẫn fail sau khi enable?
- Đợi 1-2 phút sau khi enable
- Re-run workflow
- Kiểm tra logs trong Actions tab


