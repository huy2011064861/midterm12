# Tóm Tắt Thay Đổi - Hệ Thống Phân Quyền

## Tổng Quan

Ứng dụng quản lý sản phẩm đã được nâng cấp với **hệ thống xác thực (Authentication) và phân quyền (Authorization)** hoàn chỉnh.

---

## Các Tính Năng Mới

### 1. **Trang Đăng Nhập (Login Page)**
- Giao diện đẹp với gradient background
- Nút đăng nhập nhanh cho tài khoản demo
- Hiển thị thông báo lỗi khi đăng nhập sai

**File**: `frontend/src/components/Login.jsx` & `Login.css`

### 2. **Quản Lý User Session**
- Lưu JWT token vào `localStorage`
- Tự động khôi phục session khi reload trang
- Đăng xuất tính năng

**File**: `frontend/src/AuthContext.jsx`

### 3. **Bảo Vệ Routes**
- Chỉ user đã đăng nhập mới có thể truy cập app
- Nếu token hết hạn, tự động giải phóng và yêu cầu đăng nhập lại

**File**: `frontend/src/components/ProtectedRoute.jsx`

### 4. **Phân Quyền dựa trên Role**
- **Admin**: Có thể tạo, sửa, xóa sản phẩm
- **User**: Chỉ có thể xem sản phẩm

**Files**: 
- Backend: `backend/server.js` (middleware `checkRole()`)
- Frontend: `App.jsx`, `ProductList.jsx`, `ProductDetail.jsx`

### 5. **Giao Diện UI Updates**
- Header mới hiển thị username & role badge
- Nút "Thêm Sản Phẩm" chỉ hiển thị cho Admin
- Nút "Sửa", "Xóa" ẩn đi cho User thường
- Nút "Đăng Xuất" trong header

**File**: `frontend/src/style.css`

---

## Thay Đổi Chi Tiết

### Backend (`backend/`)

#### ✅ `package.json`
```diff
+ "jsonwebtoken": "^9.0.0"
```

#### ✅ `users.json` (Mới)
- Database người dùng với 3 tài khoản demo
- Cấu trúc: `id`, `username`, `password`, `role`, `email`

#### ✅ `server.js`
**Thêm:**
- `const jwt = require('jsonwebtoken')`
- `readUsers()` - Hàm đọc users.json
- `verifyToken` middleware - Kiểm tra JWT token
- `checkRole(role)` middleware - Kiểm tra quyền user
- `POST /login` endpoint - Endpoint đăng nhập
- **Bảo vệ endpoints**:
  - `POST /products` ← Admin only
  - `PUT /products/:id` ← Admin only
  - `DELETE /products/:id` ← Admin only
  - `GET /products` ← Public (không cần auth)

---

### Frontend (`frontend/`)

#### ✅ `src/AuthContext.jsx` (Mới)
- Context API để quản lý auth state
- Hàm `login()` - Gửi request đến `/login`
- Hàm `logout()` - Xóa session
- Properties: `user`, `token`, `isAdmin`, `isAuthenticated`, `loading`

#### ✅ `src/api.js`
```diff
+ // Interceptor để tự động thêm Authorization header
+ apiClient.interceptors.request.use((config) => {
+   const token = localStorage.getItem('authToken');
+   if (token) {
+     config.headers['Authorization'] = `Bearer ${token}`;
+   }
+   return config;
+ }, (error) => {
+   return Promise.reject(error);
+ });
```

#### ✅ `src/App.jsx`
- Bọc với `AuthProvider`
- Import `AuthContext`, `ProtectedRoute`
- Tách thành `App` & `AppContent`
- Thêm logic kiểm tra `isAdmin` cho từng action
- Header mới với user info & logout button
- Error handling cho 403 Forbidden
- Tất cả text chuyển sang tiếng Việt

#### ✅ `src/components/Login.jsx` (Mới)
- Trang đăng nhập đầy đủ
- Form nhập username & password
- Nút demo để đăng nhập nhanh
- State quản lý: `username`, `password`, `error`, `loading`
- Gọi `login()` từ AuthContext

#### ✅ `src/components/Login.css` (Mới)
- Gradient background đẹp
- Responsive design
- Style cho form, buttons, error messages
- Hover effects & transitions

#### ✅ `src/components/ProtectedRoute.jsx` (Mới)
- HOC để bảo vệ routes
- Kiểm tra `isAuthenticated` & `isAdmin`
- Hiển thị Login nếu chưa đăng nhập
- Hiển thị "Access denied" nếu không đủ quyền

#### ✅ `src/components/ProductList.jsx`
```diff
- export default function ProductList({ products, loading, onSelectProduct, onEdit, onDelete }) {
+ export default function ProductList({ products, loading, onSelectProduct, onEdit, onDelete, isAdmin }) {
  // ...
+ {isAdmin && (
+   <>
+     <button className="btn btn-info btn-sm" onClick={() => onEdit(product)}>Sửa</button>
+     <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>Xóa</button>
+   </>
+ )}
```

#### ✅ `src/components/ProductDetail.jsx`
```diff
- export default function ProductDetail({ product, onEdit, onDelete, onBack }) {
+ export default function ProductDetail({ product, onEdit, onDelete, onBack, isAdmin }) {
  // ...
+ {isAdmin && (
+   <div className="detail-actions">
+     <button className="btn btn-info" onClick={onEdit}>Sửa Sản Phẩm</button>
+     <button className="btn btn-danger" onClick={onDelete}>Xóa Sản Phẩm</button>
+   </div>
+ )}
```

#### ✅ `src/components/ProductForm.jsx`
- Tất cả text chuyển sang tiếng Việt
- Error messages tiếng Việt

#### ✅ `src/style.css`
- Header mới với flexbox layout
- `.header-left` & `.header-right` classes
- `.user-info` style
- `.admin-badge` với gold background
- `.btn-logout` style
- `.loading` class

---

## File Tài Liệu (Mới)

#### ✅ `AUTHENTICATION.md`
- Hướng dẫn chi tiết về hệ thống phân quyền
- Thông tin tài khoản demo
- Cấu trúc hệ thống
- Quy trình đăng nhập
- Troubleshooting

#### ✅ `INSTALLATION.md`
- Hướng dẫn cài đặt từ A-Z cho Windows
- Cách chạy backend & frontend
- Troubleshooting lỗi thường gặp
- Lệnh PowerShell cụ thể

#### ✅ `SUMMARY.md` (File này)
- Tóm tắt tất cả thay đổi

---

## Bảo Mật

### Token-based Authentication
- JWT tokens hết hạn sau 24h
- Token được gửi trong header `Authorization: Bearer <token>`
- Token được lưu an toàn trong localStorage

### Role-Based Access Control
- Kiểm tra role trên cả backend lẫn frontend
- Backend luôn verify token trước khi xử lý
- Frontend ẩn UI không cần thiết dựa trên role

---

## Tài Khoản Demo

| Username | Password | Role | Quyền |
|----------|----------|------|-------|
| admin | admin123 | admin | Tạo, Sửa, Xóa Sản Phẩm |
| user | user123 | user | Chỉ xem Sản Phẩm |
| john | john123 | user | Chỉ xem Sản Phẩm |

---

## Cách Sử Dụng

### 1. Cài Đặt Dependencies
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Chạy Ứng Dụng
```powershell
# Terminal 1 - Backend
cd backend
npm start  # http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev  # http://localhost:5173
```

### 3. Đăng Nhập
- Mở http://localhost:5173
- Nhập username & password
- Click "Đăng Nhập" hoặc chọn tài khoản demo

### 4. Thực Hiện Actions
- **Admin**: Có thể Create/Edit/Delete sản phẩm
- **User**: Chỉ có thể View sản phẩm

---

## API Endpoints

| Method | Endpoint | Auth | Role | Mô Tả |
|--------|----------|------|------|--------|
| POST | `/login` | ❌ | — | Đăng nhập, nhận JWT |
| GET | `/products` | ❌ | — | Xem tất cả sản phẩm |
| GET | `/products/:id` | ❌ | — | Xem chi tiết sản phẩm |
| POST | `/products` | ✅ | admin | Tạo sản phẩm mới |
| PUT | `/products/:id` | ✅ | admin | Cập nhật sản phẩm |
| DELETE | `/products/:id` | ✅ | admin | Xóa sản phẩm |

---

## Cấu Trúc Thư Mục (Sau Thay Đổi)

```
midterm/
├── README.md
├── CHECKLIST.md
├── INSTALLATION.md (Mới)
├── AUTHENTICATION.md (Mới)
├── SUMMARY.md (File này)
├── run.bat
├── run.sh
├── backend/
│   ├── package.json (Cập nhật JWT)
│   ├── server.js (Cập nhật auth)
│   ├── products.json
│   └── users.json (Mới)
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── AuthContext.jsx (Mới)
        ├── api.js (Cập nhật interceptor)
        ├── App.jsx (Cập nhật)
        ├── main.jsx
        ├── style.css (Cập nhật)
        └── components/
            ├── Login.jsx (Mới)
            ├── Login.css (Mới)
            ├── ProtectedRoute.jsx (Mới)
            ├── ProductList.jsx (Cập nhật)
            ├── ProductDetail.jsx (Cập nhật)
            └── ProductForm.jsx (Cập nhật)
```

---

## Mở Rộng & Cải Tiến Tương Lai

1. **Hash Passwords**: Sử dụng bcrypt để hash passwords
2. **Refresh Tokens**: Thêm refresh token mechanism
3. **Database**: Migrate từ JSON sang MongoDB/PostgreSQL
4. **Email Verification**: Thêm xác thực email
5. **Permission System**: Thêm PBAC (Permission-Based Access Control) thay vì chỉ RBAC
6. **Audit Logging**: Ghi log tất cả actions
7. **Rate Limiting**: Bảo vệ chống brute force attacks
8. **2FA**: Two-factor authentication
9. **User Management**: CRUD users trong admin panel
10. **Forgot Password**: Quên mật khẩu functionality

---

## Lưu Ý Quan Trọng

⚠️ **Chỉ cho development/learning**:
- Passwords không được hash
- JWT secret hardcoded
- Không có HTTPS
- Không có rate limiting

✅ **Trước khi production**:
- Hash passwords với bcrypt
- Đưa JWT secret vào environment variables
- Setup HTTPS/SSL
- Thêm rate limiting
- Thêm request validation
- Setup proper logging & monitoring

---

## Tài Liệu Tham Khảo

- [JWT.io](https://jwt.io/)
- [Express.js Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [React Context API](https://react.dev/reference/react/useContext)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
