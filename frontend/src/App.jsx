import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts(filters);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    }
    setLoading(false);
  };

  // Load products on component mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Handle create product
  const handleCreateProduct = async (formData) => {
    try {
      await createProduct(formData);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
    }
  };

  // Handle update product
  const handleUpdateProduct = async (formData) => {
    try {
      await updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        if (selectedProduct?.id === id) {
          setSelectedProduct(null);
        }
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
        console.error(err);
      }
    }
  };

  // Handle filter change
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📦 Product Management System</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filter-section">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Search:</label>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Category:</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            <button 
              className="btn btn-primary btn-block"
              onClick={() => {
                setShowForm(true);
                setEditingProduct(null);
              }}
            >
              ➕ Add New Product
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {showForm ? (
            <ProductForm
              product={editingProduct}
              onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          ) : selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onEdit={() => {
                setEditingProduct(selectedProduct);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteProduct(selectedProduct.id)}
              onBack={() => setSelectedProduct(null)}
            />
          ) : (
            <ProductList
              products={products}
              loading={loading}
              onSelectProduct={setSelectedProduct}
              onEdit={(product) => {
                setEditingProduct(product);
                setShowForm(true);
              }}
              onDelete={handleDeleteProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
}
