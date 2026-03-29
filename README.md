# Vietnamese Lottery Website - Next.js 16

Website tra cứu kết quả xổ số ba miền (Miền Bắc, Miền Trung, Miền Nam) của Việt Nam.

## 🚀 Tech Stack

- **Next.js 16.2.1** (latest) with App Router
- **React 19.2.4**
- **TypeScript 5.9.3**
- **CSS Modules** for styling
- **ISR (Incremental Static Regeneration)** for caching
- **date-fns** for date handling

## ✨ Features

- 🏙️ **Miền Bắc** – Kết quả quay số hàng ngày tại Hà Nội (8 giải)
- 🌄 **Miền Trung** – Lịch quay theo ngày trong tuần, nhiều tỉnh thành (9 giải)
- 🌴 **Miền Nam** – Lịch quay theo ngày trong tuần, nhiều tỉnh thành (9 giải)
- 📅 Chọn ngày, điều hướng qua lại giữa các ngày
- ⚡ Tự động tải từ API (xsapi.vn) với fallback sang dữ liệu demo
- 📱 Responsive – hiển thị đẹp trên cả điện thoại và máy tính
- 🎨 Red/Yellow Vietnamese lottery theme
- 🔍 SEO-optimized with dynamic metadata
- ⚙️ TypeScript for type safety

## 📁 Project Structure

```
lottery-nextjs/
├── app/
│   ├── [region]/[date]/
│   │   ├── page.tsx              # Main results page (Server Component)
│   │   ├── loading.tsx           # Loading state
│   │   └── error.tsx             # Error boundary
│   ├── api/lottery/[region]/[date]/
│   │   └── route.ts              # API proxy route
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (redirects to /mb/today)
│   └── globals.css               # Global styles
│
├── components/
│   ├── layout/
│   │   ├── Header/               # Header with date display
│   │   ├── Navigation/           # Main navigation bar
│   │   ├── Footer/               # Footer
│   │   └── Sidebar/              # Statistics sidebar
│   └── lottery/
│       ├── DateNavigation/       # Date navigation (Client)
│       └── ResultsTable/         # Results display
│           ├── ResultsTableMB.tsx
│           └── ResultsTableMulti.tsx
│
├── lib/
│   ├── api/
│   │   └── client.ts             # API client with timeout & fallback
│   ├── data/
│   │   ├── demoGenerator.ts      # Deterministic demo data
│   │   ├── schedules.ts          # Province schedules
│   │   └── normalizers.ts        # API response normalization
│   ├── utils/
│   │   ├── dates.ts              # Date utilities
│   │   └── regions.ts            # Region helpers
│   └── types/
│       └── lottery.ts            # TypeScript types
│
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Server runs on [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Check

```bash
npm run type-check
```

## 🌐 Routing

### URL Structure

```
/                       → Redirects to /mb/today
/mb/today               → Miền Bắc today
/mb/2026-03-28          → Miền Bắc specific date
/mt/2026-03-28          → Miền Trung specific date
/mn/2026-03-28          → Miền Nam specific date
```

### API Routes

```
GET /api/lottery/mb/2026-03-28    # Miền Bắc
GET /api/lottery/mt/2026-03-28    # Miền Trung
GET /api/lottery/mn/2026-03-28    # Miền Nam
```

## ⚡ Performance

- **ISR Caching**:
  - Today: Revalidate every 5 minutes
  - Last 7 days: Revalidate every 1 hour
  - Older: Static (never changes)

- **Server Components**: Default for better performance
- **Client Components**: Only for interactive features (DateNavigation)

## 📊 Data Source

- **Primary**: [xsapi.vn](https://xsapi.vn) API
- **Fallback**: Deterministic demo data generator
  - Uses seeded RNG (XORShift32)
  - Same date always produces same numbers
  - Realistic lottery number formatting

## 🎨 Styling

- **CSS Modules** for component-scoped styles
- **CSS Variables** for theming
- **Red/Yellow** Vietnamese lottery theme
- **Mobile-first** responsive design

## 🔧 Configuration

### Next.js Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
};
```

### TypeScript Config

- Strict mode enabled
- Path aliases: `@/*` → project root

## 📝 Migration Notes

Migrated from vanilla HTML/CSS/JavaScript to Next.js 16:

**Original:**
- 334 lines HTML
- 505 lines JavaScript
- 1,422 lines CSS

**New Architecture:**
- TypeScript for type safety
- Component-based React architecture
- Server Components for SEO
- ISR for optimal caching
- API Routes for server-side proxy

## 📄 License

ISC

## 🙏 Credits

- Original design and data structure
- API: [xsapi.vn](https://xsapi.vn)
- Built with Next.js 16 and React 19

---

**Made with ❤️ using Next.js 16 + TypeScript**
