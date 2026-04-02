import { useState } from 'react';

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Laptop',
    price: product?.price || '',
    image: product?.image || '',
    stock: product?.stock || ''
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors([]);

    // Validate
    const validationErrors = [];
    if (!formData.name.trim()) {
      validationErrors.push('Tên sản phẩm là bắt buộc');
    }
    if (!formData.category.trim()) {
      validationErrors.push('Danh mục là bắt buộc');
    }
    if (!formData.price || formData.price <= 0) {
      validationErrors.push('Giá phải lớn hơn 0');
    }
    if (!formData.image.trim()) {
      validationErrors.push('URL hình ảnh là bắt buộc');
    }
    if (formData.stock < 0) {
      validationErrors.push('Số lượng không được âm');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit
    onSubmit(formData);
  };

  return (
    <div className="product-form-container">
      <h2>{product ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
      
      {errors.length > 0 && (
        <div className="error-box">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Tên Sản Phẩm *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div className="form-group">
          <label>Danh Mục *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Tablet">Tablet</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Giá (USD) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Số Lượng *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>URL Hình Ảnh *</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {formData.image && (
          <div className="form-group">
            <label>Xem Trước:</label>
            <img src={formData.image} alt="Preview" className="image-preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {product ? 'Cập Nhật' : 'Tạo Sản Phẩm'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
