# Hướng Dẫn Thiết Lập Affiliate Links & Monetization

## Tổng Quan

Hệ thống đã được cấu hình để hỗ trợ redirect đến các URL bên ngoài (Blogger, Substack) và tracking clicks để kiếm tiền từ affiliate links.

## Cách Sử Dụng

### 1. Thêm External URL cho Blog Posts

Trong file markdown blog (`content/blog/*.md`), thêm field `externalUrl` vào frontmatter:

```markdown
---
title: "Your Blog Post Title"
date: "2024-12-15"
excerpt: "Your excerpt"
category: "Python Tips"
externalUrl: "https://your-blogger-url.blogspot.com/post"  # Thêm dòng này
---
```

### 2. Thêm External URL cho Projects

Trong `components/Projects.tsx` hoặc `app/projects/page.tsx`, thêm `externalUrl` vào mỗi project:

```typescript
{
  title: 'Project Title',
  description: 'Description',
  tech: ['Python', 'React'],
  category: 'Data Science',
  slug: 'project-slug',
  externalUrl: 'https://your-substack-url.substack.com/p/article'  // Thêm dòng này
}
```

### 3. Cấu Hình Affiliate Tracking

Chỉnh sửa file `lib/affiliate.ts` để tích hợp với dịch vụ affiliate của bạn:

#### Option 1: Google Analytics
```typescript
// Đã có sẵn trong code
if (window.gtag) {
  window.gtag('event', 'external_link_click', {
    link_url: url,
    link_type: type,
    link_title: title,
  })
}
```

#### Option 2: Affiliate Link Service
```typescript
export function getAffiliateUrl(originalUrl: string): string {
  // Ví dụ: Sử dụng dịch vụ affiliate
  return `https://your-affiliate-service.com/redirect?url=${encodeURIComponent(originalUrl)}`
}
```

#### Option 3: Link Shortener với Monetization
```typescript
export function getAffiliateUrl(originalUrl: string): string {
  // Ví dụ: Sử dụng AdFly, Shorte.st, hoặc dịch vụ tương tự
  return `https://your-shortener.com/abc123`
}
```

#### Option 4: Custom Analytics Endpoint
```typescript
export function trackExternalClick(url: string, type: 'blog' | 'project', title: string) {
  // Gửi data đến server của bạn
  fetch('/api/track-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      url, 
      type, 
      title, 
      timestamp: Date.now(),
      userAgent: navigator.userAgent 
    })
  })
}
```

## Dịch Vụ Affiliate Phổ Biến

### 1. **Link Shorteners với Monetization:**
- **AdFly**: https://adf.ly
- **Shorte.st**: https://shorte.st
- **Linkvertise**: https://linkvertise.com
- **AdLinkFly**: https://adlinkfly.com

### 2. **Affiliate Networks:**
- **Amazon Associates**: Cho sản phẩm Amazon
- **ShareASale**: Nhiều merchant
- **CJ Affiliate**: Commission Junction
- **ClickBank**: Digital products

### 3. **Custom Solutions:**
- Tạo API endpoint riêng để track và redirect
- Sử dụng Google Analytics để track conversions
- Tích hợp với CRM để theo dõi leads

## Ví Dụ Cấu Hình

### Ví dụ với AdFly:
```typescript
// lib/affiliate.ts
export function getAffiliateUrl(originalUrl: string): string {
  const adflyUserId = 'YOUR_ADFLY_USER_ID'
  return `https://adf.ly/${adflyUserId}/${encodeURIComponent(originalUrl)}`
}
```

### Ví dụ với Custom Redirect:
```typescript
// lib/affiliate.ts
export function getAffiliateUrl(originalUrl: string): string {
  // Redirect qua server của bạn để track
  return `/api/redirect?url=${encodeURIComponent(originalUrl)}&source=portfolio`
}
```

Sau đó tạo API route: `app/api/redirect/route.ts`

## Lưu Ý

1. **Legal Compliance**: Đảm bảo tuân thủ các quy định về affiliate disclosure
2. **User Experience**: External links mở trong tab mới (`target="_blank"`)
3. **Security**: Sử dụng `rel="noopener noreferrer"` cho external links
4. **Tracking**: Có thể thêm UTM parameters để track nguồn traffic

## Testing

1. Thêm `externalUrl` vào một blog post hoặc project
2. Click vào "View Details" hoặc "Read More"
3. Kiểm tra xem có redirect đến URL đúng không
4. Kiểm tra tracking events trong analytics

## Troubleshooting

- Nếu link không hoạt động, kiểm tra `externalUrl` có đúng format không
- Nếu tracking không hoạt động, kiểm tra console để xem có lỗi không
- Đảm bảo affiliate service đã được cấu hình đúng

