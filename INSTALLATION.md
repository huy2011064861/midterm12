# Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

## Yêu Cầu Hệ Thống

- Node.js (v14 trở lên) - [Download](https://nodejs.org/)
- npm (đi kèm với Node.js)
- PowerShell hoặc Command Prompt (Windows)

---

## Cách Cài Đặt

### Bước 1: Mở Terminal
- **Windows**: Nhấn `Win + R`, gõ `powershell`, Enter
- Hoặc dùng Command Prompt: `Win + R` → `cmd`

### Bước 2: Điều Hướng Đến Thư Mục Backend
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm\backend"
```

### Bước 3: Cài Đặt Dependencies Backend
```powershell
npm install
```
Lệnh này sẽ cài đặt:
- express (web framework)
- cors (cross-origin resource sharing)
- jsonwebtoken (JWT authentication)

### Bước 4: Kiểm Tra Cài Đặt Backend
```powershell
npm start
```

Bạn sẽ thấy:
```
Server is running on http://localhost:5000
```

Nhấn `Ctrl + C` để dừng (chúng ta sẽ chạy lại sau)

### Bước 5: Mở Terminal Mới (Giữ Terminal Backend Chạy)
Mở terminal mới (không đóng cái cũ)

### Bước 6: Cài Đặt Dependencies Frontend
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm\frontend"
npm install
```

---

## Cách Chạy Ứng Dụng

### Terminal 1 - Backend
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm\backend"
npm start
```

Kết quả:
```
Server is running on http://localhost:5000
```

### Terminal 2 - Frontend
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm\frontend"
npm run dev
```

Kết quả:
```
> vite

  VITE v4.3.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Terminal 3 (Optional) - Xem File Logs
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm"
Get-Content .\backend\products.json
Get-Content .\backend\users.json
```

---

## Truy Cập Ứng Dụng

1. Mở trình duyệt web
2. Truy cập: `http://localhost:5173/`
3. Bạn sẽ thấy trang Login

---

## Đăng Nhập

### Admin (Full Permissions)
```
Username: admin
Password: admin123
```

### User (View Only)
```
Username: user
Password: user123
```

Hoặc click nút "Admin (admin)" / "User (user)" để tự động điền

---

## Cấu Trúc Terminal

Để chạy ứng dụng bình thường, bạn cần **2 terminal chạy song song**:

```
Terminal 1                  Terminal 2
┌─────────────────┐       ┌─────────────────┐
│  Backend Port   │       │  Frontend Port  │
│   :5000         │       │   :5173         │
└─────────────────┘       └─────────────────┘
npm start                 npm run dev
```

---

## Troubleshooting

### Port 5000 Đã Được Sử Dụng
```powershell
# Tìm process sử dụng port 5000
netstat -ano | findstr :5000

# Kill process (thay YOUR_PID)
taskkill /PID YOUR_PID /F
```

### Port 5173 Đã Được Sử Dụng
Vite sẽ tự động chọn port khác (5174, 5175, etc.)

### npm Không Được Tìm Thấy
- Cài đặt Node.js từ https://nodejs.org/
- Khởi động lại Terminal sau khi cài Node.js
- Kiểm tra: `node --version` nhấn Enter

### CORS Error
- Đảm bảo backend đang chạy trên `http://localhost:5000`
- Kiểm tra terminal backend có thấy "Server is running" không

### Lỗi "Cannot find module"
```powershell
# Xóa node_modules và cài lại
rm -r node_modules
npm install
```

---

## Sử Dụng Script Batch (Windows)

Tạo file `run.bat` trong thư mục midterm:

```batch
@echo off
start cmd /k "cd backend && npm start"
timeout /t 2
start cmd /k "cd frontend && npm run dev"
```

Sau đó chỉ cần double-click `run.bat` để chạy cả hai terminal cùng lúc.

---

## Dừng Ứng Dụng

- **Backend**: Nhấn `Ctrl + C` trong terminal backend
- **Frontend**: Nhấn `Ctrl + C` trong terminal frontend
- Hoặc đóng cả 2 terminal

---

## Chế Độ Development

### Hot Reload
- **Frontend**: Thay đổi file `.jsx` hoặc `.css` sẽ tự động reload
- **Backend**: Cần restart thủ công (Ctrl + C, nhập lại `npm start`)

### Debug
Browser Developer Tools: `F12` hoặc `Ctrl + Shift + I`
- Console: Xem logs & errors
- Network: Xem API calls
- Application: Xem localStorage (tokens)

---

## Build Production

### Build Frontend
```powershell
cd frontend
npm run build
```

Output sẽ ở thư mục `frontend/dist/`

### Production Server
```powershell
npm install -g serve
serve -s dist -l 3000
```

---

## Tài Liệu Thêm

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [JWT Authentication](https://jwt.io/)
