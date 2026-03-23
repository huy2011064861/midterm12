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
      validationErrors.push('Name is required');
    }
    if (!formData.category.trim()) {
      validationErrors.push('Category is required');
    }
    if (!formData.price || formData.price <= 0) {
      validationErrors.push('Price must be greater than 0');
    }
    if (!formData.image.trim()) {
      validationErrors.push('Image URL is required');
    }
    if (formData.stock < 0) {
      validationErrors.push('Stock cannot be negative');
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
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
      
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
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
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
            <label>Price (USD) *</label>
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
            <label>Stock Quantity *</label>
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
          <label>Image URL *</label>
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
            <label>Preview:</label>
            <img src={formData.image} alt="Preview" className="image-preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {product ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
