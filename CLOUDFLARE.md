# Cloudflare Pages Configuration

## Build Settings:
- **Framework**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output**: `out`
- **Node version**: 18.x

## Environment Variables:
```
NODE_VERSION=18
NEXT_PUBLIC_SITE_URL=https://oman-makhzoonk.shop
```

## Notes:
- Static export enabled (output: 'export')
- No server-side rendering
- All images unoptimized for static hosting
- API routes disabled (static only)
