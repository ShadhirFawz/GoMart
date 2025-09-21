import { useEffect, useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export default function ProductList({ refreshCount }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  // Fetch products whenever component loads or refreshCount changes
  useEffect(() => {
    setIsLoading(true);
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setProducts([]);
        setIsLoading(false);
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to load products.',
          duration: 5000
        });
      });
  }, [refreshCount]); // Only depend on refreshCount, not addToast

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {/* Header inside the product list area */}
      <header className="text-center mb-4">
        <h1 className="main-title">Product Catalogue</h1>
        <p className="subtitle">Manage your product inventory with ease</p>
      </header>
      
      {products.length === 0 ? (
        <div className="text-center py-5">
          <div className="empty-state">
            <i className="bi bi-inbox display-4 text-muted"></i>
            <h4 className="mt-3">No products available</h4>
            <p className="text-muted">Add your first product using the form on the left</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {products.map((p, index) => (
            <div 
              key={p.id} 
              className="col-12 col-sm-6 col-xl-4 mb-4"
              style={{ animation: `slideUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              <div className="card h-100 shadow-sm border-0 card-hover product-card">
                <div className="product-image-container">
                  <img
                    src={`http://127.0.0.1:8000/${p.image_path}`}
                    alt={p.product_name}
                    className="card-img-top product-image"
                  />
                  <div className="product-overlay"></div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{p.product_name}</h5>
                  <p className="card-text fw-bold text-primary fs-4">Rs{p.price}</p>
                  <div className="mt-auto">
                    <button className="btn btn-outline-primary w-100">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}