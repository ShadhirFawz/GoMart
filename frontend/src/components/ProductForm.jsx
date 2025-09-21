import { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export default function ProductForm({ onProductAdded }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Frontend validation
    if (!productName || !price || isNaN(price) || price <= 0) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter a valid product name and positive price.',
        duration: 5000
      });
      setIsSubmitting(false);
      return;
    }
    if (!image) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please upload a product image.',
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
      
      setProductName('');
      setPrice('');
      setImage(null);
      e.target.reset(); // reset file input
      onProductAdded(); // refresh product list
    } catch (err) {
      if (err.response?.data?.errors?.product_name) {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Product name already exists.',
          duration: 5000
        });
      } else if (err.response?.data?.errors?.image) {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Invalid image format or size (max 2MB).',
          duration: 5000
        });
      } else {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Error adding product.',
          duration: 5000
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-0 card-hover">
      <h3 className="mb-4 text-gradient">Add New Product</h3>
      
      <div className="mb-3">
        <label className="form-label fw-semibold">Product Name</label>
        <input
          type="text"
          className="form-control form-control-lg"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Price ($)</label>
        <input
          type="number"
          className="form-control form-control-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Product Image</label>
        <input
          type="file"
          className="form-control form-control-lg"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="form-text">Upload a JPG, PNG or WEBP image (max 2MB)</div>
      </div>

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