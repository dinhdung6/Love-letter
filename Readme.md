# 100 Love Messages - Setup Guide 💕

Hướng dẫn chi tiết để cài đặt và chạy dự án website tin nhắn yêu thương.

## Tổng quan dự án

Đây là một website tặng quà cho người yêu với 100 tin nhắn yêu thương. Mỗi tin nhắn nằm trong một phong bì ảo. Người dùng có thể chọn ngẫu nhiên hoặc chọn theo số. Tin nhắn đã mở sẽ được lưu trong database và hiển thị ở sidebar.

## Yêu cầu hệ thống

- **Node.js** 18.x hoặc cao hơn
- **pnpm** (khuyến nghị) hoặc npm
- **Tài khoản Supabase** (miễn phí)

---

## Phần 1: Thiết lập Supabase

### Bước 1: Tạo tài khoản Supabase

### Bước 2: Tạo Project mới

### Bước 3: Lấy API Keys

### Bước 4: Tạo Tables trong Database

### Bước 5: Import 100 tin nhắn

### Bước 6: Kiểm tra dữ liệu

1. Vào **Table Editor** ở sidebar trái
2. Click vào table **"messages"**
3. Kiểm tra xem 100 tin nhắn đã được import chưa

## Phần 2: Thiết lập Project Local

### Bước 1: Clone/Download Project

### Bước 2: Cài đặt Dependencies

```bash
# Sử dụng pnpm (khuyến nghị)
pnpm install

# Hoặc sử dụng npm
npm install
```

### Bước 3: Tạo file Environment Variables

1. Copy file `.env.example` thành `.env.local`:

2. Mở file `.env.local` và điền thông tin từ Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Bước 4: Chạy Development Server

```bash
# Sử dụng pnpm
pnpm dev

# Hoặc npm
npm run dev
```

### Bước 5: Truy cập Website

Mở browser và truy cập: [http://localhost:3000](http://localhost:3000)

---

## Cấu trúc Project

```
love-messages/
├── app/
│   ├── api/
│   │   ├── messages/
│   │   │   └── status/
│   │   │       └── route.ts      # GET: Lấy danh sách tin đã mở
│   │   ├── message/
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET: Lấy chi tiết tin nhắn
│   │   └── open-message/
│   │       └── route.ts          # POST: Mở tin nhắn mới
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── envelope.tsx              # Component phong bì
│   ├── love-messages.tsx         # Component chính
│   ├── message-controls.tsx      # Nút điều khiển
│   ├── message-sidebar.tsx       # Sidebar lịch sử
│   └── progress-bar.tsx          # Thanh tiến độ
├── hooks/
│   ├── use-messages.ts           # Hook quản lý tin nhắn
│   └── use-user-id.ts            # Hook quản lý user ID
├── lib/
│   ├── supabase.ts               # Supabase client
│   └── utils.ts
├── scripts/
│   ├── 01-create-tables.sql      # Script tạo tables
│   └── 02-seed-messages.sql      # Script import tin nhắn
├── .env.example
├── .env.local                    # File này bạn tự tạo
└── package.json
```

---

## Tính năng

✅ **Random Pick**: Chọn ngẫu nhiên tin nhắn chưa mở  
✅ **Manual Select**: Nhập số từ 1-100 để chọn  
✅ **Persistent State**: Tin đã mở được lưu trong database  
✅ **Sidebar History**: Xem lại các tin đã mở  
✅ **Progress Bar**: Theo dõi tiến độ mở tin  
✅ **Envelope Animation**: Hiệu ứng mở phong bì  
✅ **Heart Confetti**: Pháo hoa khi mở tin nhắn  
✅ **Responsive Design**: Tương thích mobile  
✅ **Multi-user Support**: Mỗi người có lịch sử riêng

---

## Xử lý sự cố

### Tin nhắn không hiện sau khi mở

**Nguyên nhân**: Có thể do lỗi insert vào `opened_messages`.

**Cách sửa**:
1. Kiểm tra table `opened_messages` trong Supabase Table Editor
2. Xem logs trong browser console (F12)

---

## Tùy chỉnh

### Đổi màu theme

Mở file `components/love-messages.tsx` và `app/globals.css` để thay đổi màu:
- `#FFD1DC` - Light Pink
- `#A8E6CF` - Mint Green  
- `#BDE0FE` - Soft Blue

### Đổi tiêu đề

Mở file `app/layout.tsx` để đổi `title` và `description`.

### Thêm hiệu ứng confetti

Mở file `components/envelope.tsx` để tùy chỉnh confetti.

---

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Console log trong browser (F12 → Console)
2. Network tab để xem API responses
3. Supabase logs trong Dashboard → Logs

---

