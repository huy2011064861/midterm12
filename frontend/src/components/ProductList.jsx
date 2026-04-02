export default function ProductList({ products, loading, onSelectProduct, onEdit, onDelete, isAdmin }) {
  if (loading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  if (products.length === 0) {
    return <div className="empty-state">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="product-list">
      <h2>Sản Phẩm ({products.length})</h2>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">${product.price.toLocaleString()}</p>
              <p className="stock">Số Lượng: {product.stock}</p>
              
              <div className="product-card-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onSelectProduct(product)}
                >
                  Xem
                </button>
                {isAdmin && (
                  <>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => onEdit(product)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(product.id)}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
