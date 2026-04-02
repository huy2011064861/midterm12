# 🚀 Quick Start - Hệ Thống Phân Quyền

## ⚡ Cách Bắt Đầu Nhanh (Dành cho Windows)

### Bước 1: Mở 2 PowerShell
- Lần 1: `Win + R` → `powershell`
- Lần 2: `Win + R` → `powershell` (mở cái thứ 2)

### Bước 2: Terminal 1 - Chạy Backend
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm\backend"
npm install
npm start
```

Kết quả:
```
Server is running on http://localhost:5000
```

⏸️ **Giữ terminal này chạy, đừng đóng**

### Bước 3: Terminal 2 - Chạy Frontend
```powershell
cd "c:\Users\huyde\OneDrive\Documents\midterm\frontend"
npm install
npm run dev
```

Kết quả:
```
VITE v4.3.0 ready in 500ms
➜ Local: http://localhost:5173/
```

### Bước 4: Mở Trình Duyệt
- Truy cập: **http://localhost:5173/**

---

## 👤 Đăng Nhập

### Cách 1: Nhập Thủ Công
```
Username: admin  (hoặc user)
Password: admin123  (hoặc user123)
```

### Cách 2: Click Nút Demo
Click nút **"Admin (admin)"** hoặc **"User (user)"**

---

## 🔐 Tài Khoản Demo

| Role | Username | Password | Chức Năng |
|------|----------|----------|-----------|
| 🔑 Admin | admin | admin123 | ✅ Tạo, Sửa, Xóa |
| 👤 User | user | user123 | 📖 Chỉ Xem |

---

## 🎮 Thử Tính Năng

### Admin (admin/admin123)
1. ✅ Xem danh sách sản phẩm
2. ✅ Click sản phẩm xem chi tiết
3. ✅ Click nút "Thêm Sản Phẩm" (nút này xuất hiện)
4. ✅ Click "Sửa" để chỉnh sửa sản phẩm
5. ✅ Click "Xóa" để xóa sản phẩm

### User (user/user123)
1. ✅ Xem danh sách sản phẩm
2. ✅ Click sản phẩm xem chi tiết
3. ❌ KHÔNG thấy nút "Thêm Sản Phẩm" (nút ẩn)
4. ❌ KHÔNG thấy nút "Sửa" (nút ẩn)
5. ❌ KHÔNG thấy nút "Xóa" (nút ẩn)

---

## 📁 Tìm Hiểu Code

### Hệ Thống Login
- 📄 `frontend/src/components/Login.jsx` - Trang đăng nhập
- 📄 `backend/server.js` - Endpoint `/login`

### Bảo Vệ Routes
- 📄 `frontend/src/AuthContext.jsx` - Quản lý session
- 📄 `frontend/src/components/ProtectedRoute.jsx` - Bảo vệ routes

### Phân Quyền
- 📄 `backend/server.js` - Middleware `verifyToken()` & `checkRole()`
- 📄 `frontend/src/App.jsx` - Kiểm tra role trước khi hiển thị nút

### User Data
- 📄 `backend/users.json` - Danh sách users
- 📄 `backend/products.json` - Danh sách products

---

## 🐛 Lỗi Thường Gặp & Cách Khắc Phục

### ❌ Port 5000 bị chiếm
```powershell
# Tìm process
netstat -ano | findstr :5000

# Kill it (thay YOUR_PID)
taskkill /PID YOUR_PID /F
```

### ❌ npm không tìm thấy
- Cài Node.js từ https://nodejs.org/
- Khởi động lại PowerShell

### ❌ CORS Error
- Kiểm tra backend chạy ở `localhost:5000`
- Restart backend

### ❌ "Cannot login"
- Kiểm tra username/password đúng không
- Mở `backend/users.json` để xem tài khoản
- Restart backend

---

## 📚 Tài Liệu Chi Tiết

- `AUTHENTICATION.md` - Hệ thống phân quyền chi tiết
- `INSTALLATION.md` - Hướng dẫn cài đặt đầy đủ
- `SUMMARY.md` - Tóm tắt thay đổi

---

## ✨ Điều Tiếp Theo?

- [x] Hệ thống login
- [x] Xác thực JWT
- [x] Phân quyền Admin/User
- [ ] Hash passwords (bcrypt)
- [ ] Database thực sự (MongoDB)
- [ ] Quên mật khẩu
- [ ] 2-Factor Authentication
- [ ] Quản lý users trong admin panel

---

## 💡 Tips

1. **Dev mode**: Sửa code, frontend tự động reload (backend cần restart)
2. **Browser DevTools**: `F12` → Network tab xem API calls
3. **localStorage**: `F12` → Application → localStorage để xem tokens
4. **API Test**: Dùng Postman test backend APIs

---

Vậy thôi! 🎉 Hệ thống phân quyền đã sẵn sàng. Thắc mắc gì bạn có thể tham khảo các file `.md` trong thư mục.
