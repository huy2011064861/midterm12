# Product Management System - Midterm Assignment

A full-stack web application for managing products with React frontend and Node.js/Express backend.

## 📁 Project Structure

```
midterm/
├── backend/              # Node.js + Express server
│   ├── package.json
│   ├── server.js
│   └── products.json
└── frontend/             # React application
    ├── src/
    │   ├── components/
    │   │   ├── ProductList.jsx
    │   │   ├── ProductDetail.jsx
    │   │   └── ProductForm.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── style.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Or with auto-reload (development):
```bash
npm run dev
```

The server will run on **http://localhost:5000**

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will run on **http://localhost:5173**

## 📋 API Endpoints

### Products

#### GET /products
Get all products with optional filters

**Query Parameters:**
- `category` (optional): Filter by category (Laptop, Phone, etc.)
- `search` (optional): Search by product name

**Example:**
```
GET http://localhost:5000/products?category=Phone
GET http://localhost:5000/products?search=iphone
```

#### GET /products/:id
Get product details by ID

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Laptop Dell XPS 13",
  "category": "Laptop",
  "price": 2500,
  "image": "https://...",
  "stock": 5
}
```

**Error (404 Not Found):**
```json
{ "error": "Product not found" }
```

#### POST /products
Create a new product

**Request Body:**
```json
{
  "name": "string",
  "category": "string",
  "price": number,
  "image": "string",
  "stock": number
}
```

**Validation:**
- All fields are required
- Price must be > 0
- Stock must be >= 0

**Response (201 Created):**
```json
{
  "id": 5,
  "name": "New Product",
  "category": "Laptop",
  "price": 1999,
  "image": "https://...",
  "stock": 10
}
```

#### PUT /products/:id
Update an existing product

**Request Body:** Same as POST

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Updated Name",
  "category": "Laptop",
  "price": 2800,
  "image": "https://...",
  "stock": 7
}
```

**Error (404 Not Found):**
```json
{ "error": "Product not found" }
```

#### DELETE /products/:id
Delete a product

**Response (200 OK):**
```json
{
  "message": "Product deleted successfully",
  "product": { ... }
}
```

**Error (404 Not Found):**
```json
{ "error": "Product not found" }
```

## 💻 Frontend Features

### Product List
- Display all products in a responsive grid
- Filter by category
- Search products by name
- Quick actions: View, Edit, Delete

### Product Detail
- View complete product information
- See product image
- Stock information
- Edit or delete product

### Add/Edit Product
- Form validation
- Image URL preview
- Support for multiple categories
- Error messages for invalid inputs

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **File System** - JSON data storage

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling

## 📝 Data Structure

Products are stored in `backend/products.json`:

```json
[
  {
    "id": 1,
    "name": "Laptop Dell XPS 13",
    "category": "Laptop",
    "price": 2500,
    "image": "https://images.unsplash.com/...",
    "stock": 5
  }
]
```

## ✅ Implementation Checklist

### Backend (40%)
- ✅ Express server setup
- ✅ CORS enabled
- ✅ JSON parsing middleware
- ✅ GET /products (with filters)
- ✅ GET /products/:id
- ✅ POST /products (with validation)
- ✅ PUT /products/:id
- ✅ DELETE /products/:id
- ✅ Query filters (category, search)

### Frontend (60%)
- ✅ React setup with Vite
- ✅ Product list component
- ✅ Product detail view
- ✅ Add/Edit product form
- ✅ API integration
- ✅ Filter functionality
- ✅ Responsive design
- ✅ Error handling

## 🧪 Testing the API

You can test the API using:

1. **Browser:** Visit `http://localhost:5173`
2. **Postman:** Import API endpoints
3. **cURL:** 
```bash
curl http://localhost:5000/products
curl http://localhost:5000/products/1
```

## 📚 Example Workflow

1. Start backend: `npm start` (in backend folder)
2. Start frontend: `npm run dev` (in frontend folder)
3. Open browser: `http://localhost:5173`
4. View all products
5. Search or filter products
6. Add a new product
7. Edit or delete products
8. Details view for each product

## ⚡ Development Tips

- Backend server must be running for frontend to work
- Check browser console for API errors
- Use browser DevTools (F12) to inspect network requests
- Modify `products.json` directly to reset data

## 📄 License

This is a midterm assignment project.
