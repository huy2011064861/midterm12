const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const productsFile = path.join(__dirname, 'products.json');
const usersFile = path.join(__dirname, 'users.json');
const JWT_SECRET = 'your-secret-key-change-in-production'; // Thay đổi trong production

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read users from JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Verify JWT Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Check Role Middleware
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: `Access denied. ${requiredRole} role required.` });
    }
    next();
  };
};

// Helper function to read products from JSON file
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
};

// Helper function to write products to JSON file
const writeProducts = (products) => {
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing products:', error);
  }
};

// Helper function to validate product
const validateProduct = (product) => {
  const errors = [];

  if (!product.name || typeof product.name !== 'string') {
    errors.push('Name is required and must be a string');
  }
  if (!product.category || typeof product.category !== 'string') {
    errors.push('Category is required and must be a string');
  }
  if (typeof product.price !== 'number' || product.price <= 0) {
    errors.push('Price must be a number greater than 0');
  }
  if (!product.image || typeof product.image !== 'string') {
    errors.push('Image is required and must be a string');
  }
  if (typeof product.stock !== 'number' || product.stock < 0) {
    errors.push('Stock must be a number greater than or equal to 0');
  }

  return errors;
};

// ===== API ENDPOINTS =====

// POST /login - User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email
    }
  });
});

// ===== API ENDPOINTS =====

// GET /products - Get all products with optional filters
app.get('/products', (req, res) => {
  let products = readProducts();
  const { category, search } = req.query;

  // Filter by category
  if (category) {
    products = products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search term
  if (search) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(products);
});

// GET /products/:id - Get product by ID
app.get('/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

// POST /products - Create new product (Admin only)
app.post('/products', verifyToken, checkRole('admin'), (req, res) => {
  const { name, category, price, image, stock } = req.body;

  // Validate input
  const errors = validateProduct({ name, category, price, image, stock });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const products = readProducts();
  
  // Generate new ID
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    name,
    category,
    price,
    image,
    stock
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// PUT /products/:id - Update product (Admin only)
app.put('/products/:id', verifyToken, checkRole('admin'), (req, res) => {
  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, category, price, image, stock } = req.body;
  
  // Validate input
  const errors = validateProduct({ name, category, price, image, stock });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Update product
  products[productIndex] = {
    id: products[productIndex].id,
    name,
    category,
    price,
    image,
    stock
  };

  writeProducts(products);
  res.json(products[productIndex]);
});

// DELETE /products/:id - Delete product (Admin only)
app.delete('/products/:id', verifyToken, checkRole('admin'), (req, res) => {
  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1);
  writeProducts(products);

  res.json({ message: 'Product deleted successfully', product: deletedProduct[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
