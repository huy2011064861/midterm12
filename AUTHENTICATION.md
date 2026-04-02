# Hệ Thống Phân Quyền & Authentication

## Tổng Quan

Ứng dụng hiện đã được triển khai hệ thống phân quyền đầy đủ với:
- **Login & Authentication**: Sử dụng JWT tokens
- **Role-Based Access Control (RBAC)**: Phân chia quyền Admin vs User
- **Protected Routes**: Bảo vệ các chức năng quản lý sản phẩm

---

## Tài Khoản Demo

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Quyền**: Tạo, sửa, xóa sản phẩm

### User Account
- **Username**: `user`
- **Password**: `user123`
- **Quyền**: Chỉ xem sản phẩm (không thể tạo, sửa, xóa)

### User Account 2
- **Username**: `john`
- **Password**: `john123`
- **Quyền**: Chỉ xem sản phẩm (không thể tạo, sửa, xóa)

---

## Hướng Dẫn Cài Đặt

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

**Backend sẽ chạy trên**: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

**Frontend sẽ chạy trên**: `http://localhost:5173` (hoặc port khác nếu bị chiếm)

---

## Cấu Trúc Hệ Thống

### Backend API Endpoints

#### Authentication
- **POST `/login`**
  - Request: `{ username: string, password: string }`
  - Response: `{ token: string, user: Object }`

#### Products (Protected Routes)
- **GET `/products`** - Tất cả user có thể xem
- **GET `/products/:id`** - Tất cả user có thể xem chi tiết
- **POST `/products`** - ✅ **Admin only** - Tạo sản phẩm mới
- **PUT `/products/:id`** - ✅ **Admin only** - Cập nhật sản phẩm
- **DELETE `/products/:id`** - ✅ **Admin only** - Xóa sản phẩm

### Frontend Components

```
src/
├── AuthContext.jsx           # Context cho auth state management
├── components/
│   ├── Login.jsx            # Trang đăng nhập
│   ├── Login.css            # Style Login
│   ├── ProtectedRoute.jsx   # Component bảo vệ routes
│   ├── ProductList.jsx      # Danh sách sản phẩm (chỉnh sửa rồi)
│   ├── ProductDetail.jsx    # Chi tiết sản phẩm (chỉnh sửa rồi)
│   └── ProductForm.jsx      # Form tạo/sửa sản phẩm
├── api.js                    # API client với JWT interceptor
├── App.jsx                   # Main app component (chỉnh sửa rồi)
└── style.css                 # Global styles (chỉnh sửa rồi)
```

---

## Quy Trình Đăng Nhập

1. **Nhập thông tin**: User nhập username & password trên Login page
2. **Gửi request**: `POST /login` với credentials
3. **Nhận token**: Backend trả về JWT token (hạn sử dụng 24h)
4. **Lưu token**: Token được lưu vào `localStorage`
5. **Attach token**: Tất cả request sau này tự động attach token vào header:
   ```
   Authorization: Bearer <token>
   ```
6. **Kiểm tra quyền**: Backend kiểm tra token và role của user
7. **Thực hiện action**: Nếu hợp lệ, thực hiện action; nếu không, trả về lỗi 403

---

## Hành Vi dựa trên Role

### Admin User 🔑
- ✅ Xem tất cả sản phẩm
- ✅ Thêm sản phẩm mới (nút "Thêm Sản Phẩm" hiển thị)
- ✅ Sửa sản phẩm (nút "Sửa" hiển thị ở cả list lẫn detail)
- ✅ Xóa sản phẩm (nút "Xóa" hiển thị ở cả list lẫn detail)

### Regular User 👤
- ✅ Xem tất cả sản phẩm
- ❌ Không thể thêm sản phẩm (nút ẩn, không truy cập được API)
- ❌ Không thể sửa sản phẩm (nút ẩn, không truy cập được API)
- ❌ Không thể xóa sản phẩm (nút ẩn, không truy cập được API)

---

## File Dữ Liệu

### users.json
```json
[
  {
    "id": 1,
    "username": "admin",
    "password": "admin123",
    "role": "admin",
    "email": "admin@example.com"
  },
  {
    "id": 2,
    "username": "user",
    "password": "user123",
    "role": "user",
    "email": "user@example.com"
  }
]
```

### products.json
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "category": "Laptop",
    "price": 999.99,
    "image": "image_url",
    "stock": 10
  }
]
```

---

## Middleware Guard

### verifyToken
- Kiểm tra xem request có chứa JWT token trong header `Authorization`
- Nếu không, trả về: `401 Unauthorized`
- Nếu token không hợp lệ, trả về: `403 Forbidden`

### checkRole(role)
- Kiểm tra xem user role có khớp với required role không
- Nếu không, trả về: `403 Forbidden - Access denied. {role} role required.`

---

## Lưu Trữ Session

- **Token**: Lưu trong `localStorage` với key `authToken`
- **User Info**: Lưu trong `localStorage` với key `authUser`
- **Tự động restore**: Khi reload trang, hệ thống tự động khôi phục user session từ localStorage

---

## Xóa Tài Khoản Demo

Để thêm tài khoản mới hoặc sửa tài khoản hiện tại, chỉnh sửa file `backend/users.json`:

```json
{
  "id": 4,
  "username": "newuser",
  "password": "password123",
  "role": "admin",
  "email": "newuser@example.com"
}
```

**Lưu ý**: 
- Mật khẩu hiện được lưu plaintext (chỉ để demo). Trên production, phải hash mật khẩu
- Role có thể là: `"admin"` hoặc `"user"`

---

## Lỗi Thường Gặp

### 401 Unauthorized
- Nguyên nhân: Chưa đăng nhập hoặc token hết hạn
- Cách khắc phục: Đăng nhập lại

### 403 Forbidden - Access denied
- Nguyên nhân: User không có quyền thực hiện action này
- Cách khắc phục: Đăng nhập bằng tài khoản admin

### CORS Error
- Nguyên nhân: Backend server chưa chạy
- Cách khắc phục: `cd backend && npm start`

---

## Mở Rộng (Future Improvements)

Để nâng cao bảo mật:
1. **Hash mật khẩu**: Sử dụng bcrypt để hash passwords
2. **Refresh tokens**: Thêm refresh token mechanism
3. **Database**: Move from JSON to MongoDB/PostgreSQL
4. **Email verification**: Thêm xác thực email
5. **Permission system**: Thêm permission granular hơn (PBAC)
6. **Audit logging**: Ghi log tất cả actions của users
7. **Rate limiting**: Protect against brute force attacks
