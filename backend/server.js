const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const productsFile = path.join(__dirname, 'products.json');

// Middleware
app.use(cors());
app.use(express.json());

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

// POST /products - Create new product
app.post('/products', (req, res) => {
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

// PUT /products/:id - Update product
app.put('/products/:id', (req, res) => {
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

// DELETE /products/:id - Delete product
app.delete('/products/:id', (req, res) => {
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
