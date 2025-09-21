import { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { validateProductForm, getFieldError, hasErrors } from '../utils/validation';

export default function ProductForm({ onProductAdded }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form using the validation utility
    const validationResult = validateProductForm({ productName, price, image });
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      
      // Show toast for the first error found
      const firstErrorKey = Object.keys(validationResult.errors)[0];
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: validationResult.errors[firstErrorKey],
        duration: 5000
      });
      
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('product_name', productName);
      formData.append('price', parseFloat(price).toFixed(2));
      formData.append('image', image);

      const res = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      addToast({
        type: 'success',
        title: 'Success',
        message: `Product "${productName}" added successfully!`,
        duration: 3000
      });
      
      // Reset form
      setProductName('');
      setPrice('');
      setImage(null);
      setErrors({});
      e.target.reset(); // reset file input
      
      // Refresh product list
      onProductAdded();
    } catch (err) {
      let errorMessage = 'Error adding product.';
      
      if (err.response?.data?.errors?.product_name) {
        errorMessage = 'Product name already exists.';
        setErrors({ productName: errorMessage });
      } else if (err.response?.data?.errors?.image) {
        errorMessage = 'Invalid image format or size (max 2MB).';
        setErrors({ image: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
      
      addToast({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    // Clear error when user starts typing in a field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (field === 'productName') setProductName(value);
    if (field === 'price') setPrice(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Clear image error when user selects a new file
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-2 card-hover">
      <h3 className="mb-4 text-gradient">Add New Product</h3>
      
      <div className="mb-3">
        <label className="form-label fw-semibold">Product Name</label>
        <input
          type="text"
          className={`form-control form-control-md ${errors.productName ? 'is-invalid' : ''}`}
          value={productName}
          onChange={(e) => handleInputChange('productName', e.target.value)}
          placeholder="Enter product name"
        />
        {errors.productName && (
          <div className="invalid-feedback">{errors.productName}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Price (Rs)</label>
        <input
          type="number"
          className={`form-control form-control-md ${errors.price ? 'is-invalid' : ''}`}
          value={price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          placeholder="Enter price"
          step="0.01"
        />
        {errors.price && (
          <div className="invalid-feedback">{errors.price}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Product Image</label>
        <input
          type="file"
          className={`form-control form-control-md ${errors.image ? 'is-invalid' : ''}`}
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="form-text">Upload a JPG, PNG or WEBP image (max 2MB)</div>
        {errors.image && (
          <div className="invalid-feedback">{errors.image}</div>
        )}
      </div>

      {errors.general && (
        <div className="alert alert-danger mb-3" role="alert">
          {errors.general}
        </div>
      )}

      <button 
        type="submit" 
        className="btn btn-primary btn-lg w-100 py-2 fw-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Adding Product...
          </>
        ) : (
          'Add Product'
        )}
      </button>
    </form>
  );
}