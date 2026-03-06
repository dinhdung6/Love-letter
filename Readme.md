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

1. Truy cập [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** hoặc **"Sign Up"**
3. Đăng nhập bằng GitHub hoặc email

### Bước 2: Tạo Project mới

1. Sau khi đăng nhập, click **"New Project"**
2. Chọn **Organization** (hoặc tạo mới nếu chưa có)
3. Điền thông tin:
   - **Name**: `love-messages` (hoặc tên bạn muốn)
   - **Database Password**: Tạo mật khẩu mạnh và **LƯU LẠI**
   - **Region**: Chọn region gần bạn nhất (ví dụ: Singapore)
4. Click **"Create new project"**
5. Đợi 1-2 phút để Supabase khởi tạo project

### Bước 3: Lấy API Keys

1. Sau khi project được tạo, vào **Project Settings** (icon bánh răng ở sidebar trái)
2. Click **"API"** trong menu bên trái
3. Copy các giá trị sau:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Chuỗi dài bắt đầu bằng `eyJ...`

![Supabase API Settings](https://supabase.com/docs/img/api-settings.png)

### Bước 4: Tạo Tables trong Database

1. Trong Supabase Dashboard, click **"SQL Editor"** ở sidebar trái
2. Click **"New query"**
3. Copy và paste nội dung file `scripts/01-create-tables.sql`:

```sql
-- Enable UUID extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY,
  content TEXT NOT NULL
);

-- Create opened_messages table
CREATE TABLE IF NOT EXISTS opened_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  message_id INTEGER NOT NULL REFERENCES messages(id),
  envelope_color TEXT NOT NULL,
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_opened_messages_user_id ON opened_messages(user_id);

-- Create unique constraint to prevent duplicate opened messages
CREATE UNIQUE INDEX IF NOT EXISTS idx_opened_messages_unique ON opened_messages(user_id, message_id);
```

4. Click **"Run"** (hoặc Ctrl/Cmd + Enter)
5. Bạn sẽ thấy thông báo **"Success. No rows returned"**

### Bước 5: Import 100 tin nhắn

1. Trong SQL Editor, tạo query mới
2. Import tin nhắn của bạn theo format sau:

```sql
INSERT INTO messages (id, content) VALUES
(1, 'Sữa yêu An An vì công chúa là "mảnh ghép" hoàn hảo nhất mà định mệnh đã mang đến cho Sữa.'),
(2, 'Yêu cách An An tỉ mẩn viết từng dòng chữ trong những tờ thông điệp trong từng bữa trưa...'),
(3, 'Tin nhắn số 3...'),
-- ... tiếp tục đến 100
(100, 'Tin nhắn cuối cùng...');
```

**Lưu ý quan trọng:**
- Mỗi tin nhắn cần có ID từ 1 đến 100
- Nội dung tin nhắn được đặt trong dấu nháy đơn `'...'`
- Nếu tin nhắn có dấu nháy đơn `'`, thay bằng hai dấu nháy đơn `''` hoặc dùng dấu nháy kép trong SQL
- Các tin nhắn cách nhau bằng dấu phẩy `,`
- Tin nhắn cuối cùng KHÔNG có dấu phẩy

3. Click **"Run"** để import

### Bước 6: Kiểm tra dữ liệu

1. Vào **Table Editor** ở sidebar trái
2. Click vào table **"messages"**
3. Kiểm tra xem 100 tin nhắn đã được import chưa

---

## Phần 2: Thiết lập Project Local

### Bước 1: Clone/Download Project

Nếu bạn download ZIP:
```bash
# Giải nén file ZIP
unzip love-messages.zip
cd love-messages
```

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

**Lấy giá trị từ đâu?**
- `NEXT_PUBLIC_SUPABASE_URL`: Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project Settings → API → anon public key

### Bước 4: Chạy Development Server

```bash
# Sử dụng pnpm
pnpm dev

# Hoặc npm
npm run dev
```

### Bước 5: Truy cập Website

Mở browser và truy cập: [http://localhost:3000](http://localhost:3000)

🎉 **Xong!** Website đã sẵn sàng để test.

---

## Phần 3: Deploy lên Vercel

### Bước 1: Push code lên GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: Love Messages Website"

# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

### Bước 2: Deploy trên Vercel

1. Truy cập [https://vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click **"Add New..."** → **"Project"**
4. Import repository từ GitHub
5. Vercel sẽ tự động detect Next.js project

### Bước 3: Cấu hình Environment Variables

Trong trang cấu hình project trên Vercel:

1. Mở phần **"Environment Variables"**
2. Thêm 2 biến sau:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

3. Click **"Deploy"**

### Bước 4: Hoàn tất

Sau khi deploy xong, Vercel sẽ cung cấp URL như:
- `https://your-project.vercel.app`

🎉 **Website của bạn đã online!**

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

## Tai khoan dang nhap

He thong co 2 tai khoan mac dinh:

| Username | Password |
|----------|----------|
| `dinhdung` | `16052005` |
| `thienan` | `28082005` |

**De thay doi hoac them tai khoan**, mo file `hooks/use-auth.ts` va sua mang `ACCOUNTS`:

```typescript
const ACCOUNTS = [
  { username: 'dinhdung', password: '16052005' },
  { username: 'thienan', password: '28082005' },
  // Them tai khoan moi o day
]
```

---

## Xử lý sự cố

### Lỗi "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Nguyên nhân**: Chưa tạo file `.env.local` hoặc chưa điền đúng giá trị.

**Cách sửa**:
1. Kiểm tra file `.env.local` tồn tại
2. Đảm bảo tên biến đúng: `NEXT_PUBLIC_SUPABASE_URL` (không phải `SUPABASE_URL`)
3. Restart dev server sau khi sửa `.env.local`

### Lỗi "relation 'messages' does not exist"

**Nguyên nhân**: Chưa chạy script tạo tables.

**Cách sửa**: Chạy lại `scripts/01-create-tables.sql` trong Supabase SQL Editor.

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

💕 **Chúc bạn và người yêu hạnh phúc!** 💕
