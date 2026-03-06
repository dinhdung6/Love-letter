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

```bash
cp .env.example .env.local
```

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

✅ **Simple Login**: Dang nhap voi username/password  
✅ **Random Pick**: Chon ngau nhien tin nhan chua mo  
✅ **Manual Select**: Nhap so tu 1-100 de chon  
✅ **Persistent State**: Tin da mo duoc luu trong database  
✅ **Sidebar History**: Xem lai cac tin da mo  
✅ **Progress Bar**: Theo doi tien do mo tin  
✅ **Envelope Animation**: Hieu ung mo phong bi  
✅ **Heart Confetti**: Phao hoa khi mo tin nhan  
✅ **Responsive Design**: Tuong thich mobile  
✅ **Multi-user Support**: Moi nguoi co lich su rieng

---

## Xử lý sự cố

### Lỗi "Message not found"

**Nguyên nhân**: Chưa import tin nhắn vào database.

**Cách sửa**: Chạy script import tin nhắn (xem Phần 1 - Bước 5).

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

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Console log trong browser (F12 → Console)
2. Network tab để xem API responses
3. Supabase logs trong Dashboard → Logs

---

💕 **Chúc bạn và người yêu hạnh phúc!** 💕
