import { useState, useEffect, useContext } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import { AuthProvider, AuthContext } from './AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAdmin, isAuthenticated, logout, loading: authLoading } = useContext(AuthContext);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts(filters);
      setProducts(response.data);
    } catch (err) {
      setError('Lỗi khi tải sản phẩm');
      console.error(err);
    }
    setLoading(false);
  };

  // Load products on component mount and when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [filters, isAuthenticated]);

  // Handle create product
  const handleCreateProduct = async (formData) => {
    try {
      await createProduct(formData);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Bạn không có quyền tạo sản phẩm. Chỉ admin mới có thể.');
      } else {
        setError('Lỗi khi tạo sản phẩm');
      }
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
      if (err.response?.status === 403) {
        setError('Bạn không có quyền cập nhật sản phẩm. Chỉ admin mới có thể.');
      } else {
        setError('Lỗi khi cập nhật sản phẩm');
      }
      console.error(err);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        if (selectedProduct?.id === id) {
          setSelectedProduct(null);
        }
        fetchProducts();
      } catch (err) {
        if (err.response?.status === 403) {
          setError('Bạn không có quyền xóa sản phẩm. Chỉ admin mới có thể.');
        } else {
          setError('Lỗi khi xóa sản phẩm');
        }
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

  if (authLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>📦 Hệ Thống Quản Lý Sản Phẩm</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>👤 {user?.username}</span>
            {isAdmin && <span className="admin-badge">🔑 Admin</span>}
          </div>
          <button className="btn btn-logout" onClick={logout}>
            Đăng Xuất
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filter-section">
            <h3>Bộ Lọc</h3>
            
            <div className="filter-group">
              <label>Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Danh Mục:</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Tất Cả Danh Mục</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            {isAdmin && (
              <button 
                className="btn btn-primary btn-block"
                onClick={() => {
                  setShowForm(true);
                  setEditingProduct(null);
                }}
              >
                ➕ Thêm Sản Phẩm
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {showForm ? (
            <ProtectedRoute requiredRole="admin">
              <ProductForm
                product={editingProduct}
                onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
              />
            </ProtectedRoute>
          ) : selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onEdit={() => {
                if (isAdmin) {
                  setEditingProduct(selectedProduct);
                  setShowForm(true);
                } else {
                  setError('Bạn không có quyền chỉnh sửa sản phẩm');
                }
              }}
              onDelete={() => {
                if (isAdmin) {
                  handleDeleteProduct(selectedProduct.id);
                } else {
                  setError('Bạn không có quyền xóa sản phẩm');
                }
              }}
              onBack={() => setSelectedProduct(null)}
              isAdmin={isAdmin}
            />
          ) : (
            <ProductList
              products={products}
              loading={loading}
              onSelectProduct={setSelectedProduct}
              onEdit={(product) => {
                if (isAdmin) {
                  setEditingProduct(product);
                  setShowForm(true);
                } else {
                  setError('Bạn không có quyền chỉnh sửa sản phẩm');
                }
              }}
              onDelete={handleDeleteProduct}
              isAdmin={isAdmin}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
