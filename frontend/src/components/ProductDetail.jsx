export default function ProductDetail({ product, onEdit, onDelete, onBack, isAdmin }) {
  return (
    <div className="product-detail">
      <button className="btn btn-secondary" onClick={onBack}>← Quay Lại</button>
      
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-category">Danh Mục: <strong>{product.category}</strong></p>
          
          <div className="detail-price">
            <h2>${product.price.toLocaleString()}</h2>
          </div>
          
          <div className="detail-stock">
            <p>Số Lượng Còn: <strong>{product.stock}</strong></p>
          </div>

          <div className="detail-id">
            <p>ID Sản Phẩm: <strong>#{product.id}</strong></p>
          </div>

          {isAdmin && (
            <div className="detail-actions">
              <button className="btn btn-info" onClick={onEdit}>Sửa Sản Phẩm</button>
              <button className="btn btn-danger" onClick={onDelete}>Xóa Sản Phẩm</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
