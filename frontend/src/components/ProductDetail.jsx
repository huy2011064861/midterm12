export default function ProductDetail({ product, onEdit, onDelete, onBack }) {
  return (
    <div className="product-detail">
      <button className="btn btn-secondary" onClick={onBack}>← Back</button>
      
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-category">Category: <strong>{product.category}</strong></p>
          
          <div className="detail-price">
            <h2>${product.price.toLocaleString()}</h2>
          </div>
          
          <div className="detail-stock">
            <p>Stock Available: <strong>{product.stock}</strong></p>
          </div>

          <div className="detail-id">
            <p>Product ID: <strong>#{product.id}</strong></p>
          </div>

          <div className="detail-actions">
            <button className="btn btn-info" onClick={onEdit}>Edit Product</button>
            <button className="btn btn-danger" onClick={onDelete}>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
