# 🌐 Custom Domain Setup Guide

## Vấn đề: Asset Path Resolution Error

Khi sử dụng **Custom Domain** với GitHub Pages, Next.js Static Export cần được cấu hình đúng để tải các tài nguyên tĩnh (images, CSS, JS, PDFs) từ root domain thay vì subdirectory.

## ✅ Giải pháp đã áp dụng

### 1. **Utility Function cho Asset Paths** (`lib/paths.ts`)

Đã tạo utility functions để tự động xử lý đường dẫn assets cho cả 2 scenarios:
- **Custom Domain**: Base path = '' (empty)
- **GitHub Pages Subdirectory**: Base path = '/repo-name'

### 2. **Cập nhật Components**

Tất cả components đã được cập nhật để sử dụng `getAssetPath()` và `getFetchPath()`:
- ✅ `components/Hero.tsx` - Profile image
- ✅ `components/Resume.tsx` - CV PDF files
- ✅ `components/SkillItem.tsx` - Certificate PDF files

### 3. **Cấu hình Next.js** (`next.config.js`)

Đã cập nhật để hỗ trợ cả `basePath` và `assetPrefix`:
- Với custom domain: cả hai đều nên là empty string
- Với subdirectory: chỉ cần `basePath`

## 📋 Cách cấu hình cho Custom Domain

### Bước 1: Thiết lập Custom Domain trên GitHub Pages

1. Vào repository settings → Pages
2. Trong phần "Custom domain", nhập domain của bạn (ví dụ: `yourdomain.com`)
3. GitHub sẽ tạo file `CNAME` trong repository

### Bước 2: Cấu hình Environment Variables

Khi build cho custom domain, **KHÔNG** set `BASE_PATH`:

```bash
# ❌ KHÔNG set BASE_PATH cho custom domain
# BASE_PATH=''  # hoặc không set gì cả

# ✅ Chỉ cần:
GITHUB_PAGES=true
NODE_ENV=production
```

### Bước 3: Build và Deploy

```bash
# Build cho custom domain
npm run build:static

# Hoặc nếu muốn chắc chắn BASE_PATH là empty:
GITHUB_PAGES=true BASE_PATH='' npm run build
```

### Bước 4: Verify trong GitHub Actions

Nếu sử dụng GitHub Actions, đảm bảo workflow không set BASE_PATH:

```yaml
- name: Build
  run: npm run build:static
  env:
    GITHUB_PAGES: true
    # KHÔNG set BASE_PATH cho custom domain
    NODE_ENV: production
```

## 🔍 Kiểm tra sau khi deploy

### 1. Check Asset Paths trong Browser DevTools

Mở DevTools → Network tab, kiểm tra:
- ✅ Images load từ: `https://yourdomain.com/profile.jpg`
- ✅ CSS load từ: `https://yourdomain.com/_next/static/...`
- ✅ JS load từ: `https://yourdomain.com/_next/static/...`
- ✅ PDFs load từ: `https://yourdomain.com/cv/filename.pdf`

### 2. Check Console Errors

Không nên có lỗi 404 cho:
- Images
- CSS files
- JS bundles
- PDF files

### 3. Test trên các trang

- ✅ Home page: Profile image hiển thị
- ✅ Resume page: CV PDF load được
- ✅ Skills page: Certificate PDFs load được (nếu có)

## ⚠️ Lưu ý quan trọng

### Custom Domain vs Subdirectory

| Scenario | BASE_PATH | Asset URLs |
|----------|-----------|------------|
| **Custom Domain** | `''` (empty) | `https://yourdomain.com/profile.jpg` |
| **Subdirectory** | `'/repo-name'` | `https://username.github.io/repo-name/profile.jpg` |

### Không mix cả hai

Nếu đã setup custom domain:
- ❌ **KHÔNG** set `BASE_PATH='/repo-name'`
- ✅ **PHẢI** set `BASE_PATH=''` hoặc không set gì cả

### Testing locally

Khi test local, Next.js tự động handle paths. Chỉ cần chú ý khi build static export:

```bash
# Test local development
npm run dev

# Test static export build
npm run build:static
npm run start  # Test built static site
```

## 🐛 Troubleshooting

### Lỗi: Assets 404 trên custom domain

**Nguyên nhân**: `BASE_PATH` được set khi không nên set

**Giải pháp**:
1. Kiểm tra environment variables
2. Đảm bảo `BASE_PATH=''` hoặc không set
3. Rebuild và redeploy

### Lỗi: Assets load từ wrong path

**Nguyên nhân**: Code chưa sử dụng `getAssetPath()`

**Giải pháp**:
1. Tìm tất cả hardcoded paths như `/profile.jpg`
2. Thay bằng `getAssetPath('profile.jpg')`
3. Check file `lib/paths.ts` có được import đúng

### Lỗi: Mixed Content (HTTP/HTTPS)

**Nguyên nhân**: Custom domain chưa enable HTTPS

**Giải pháp**:
1. Trong GitHub Pages settings, enable "Enforce HTTPS"
2. Đợi SSL certificate được cấp (có thể mất vài phút)
3. Clear browser cache và test lại

## 📚 Code Examples

### Sử dụng trong Components

```tsx
import { getAssetPath, getFetchPath } from '@/lib/paths'

// ✅ Đúng: Sử dụng getAssetPath cho images
<img src={getAssetPath('profile.jpg')} />

// ✅ Đúng: Sử dụng getFetchPath cho API calls
const response = await fetch(getFetchPath('cv/resume.pdf'))

// ❌ Sai: Hardcode path
<img src="/profile.jpg" />  // Sẽ lỗi nếu basePath được set
```

### Cấu hình Build Scripts

```json
{
  "scripts": {
    "build": "next build",
    "build:static": "cross-env GITHUB_PAGES=true NODE_ENV=production next build",
    "build:custom-domain": "cross-env GITHUB_PAGES=true BASE_PATH='' NODE_ENV=production next build"
  }
}
```

## ✅ Checklist

Sau khi setup custom domain:

- [ ] Custom domain đã được set trong GitHub Pages settings
- [ ] File `CNAME` đã được tạo trong repository
- [ ] `BASE_PATH` không được set hoặc set thành `''`
- [ ] Build script không set `BASE_PATH` cho custom domain
- [ ] Tất cả components sử dụng `getAssetPath()` và `getFetchPath()`
- [ ] Assets load đúng từ custom domain (check Network tab)
- [ ] Không có lỗi 404 trong console
- [ ] HTTPS được enable và working
- [ ] Test trên mobile và desktop browsers

## 🎯 Kết luận

Với các thay đổi này, website sẽ tự động xử lý đúng asset paths cho cả:
- ✅ GitHub Pages với custom domain
- ✅ GitHub Pages với subdirectory
- ✅ Local development

Không cần thay đổi code khi chuyển giữa các scenarios, chỉ cần set environment variables đúng.

