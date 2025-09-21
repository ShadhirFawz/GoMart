import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ToastContainer from './components/ToastContainer';
import { ToastProvider } from './context/ToastContext';
import './App.css';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleProductAdded = () => {
    // Increment the refresh counter instead of toggling a boolean
    setRefreshCount(prev => prev + 1);
  };

  return (
    <ToastProvider>
      <div className="app-container">
        <ToastContainer />
        <div className="container py-5">
          <header className="text-center mb-5">
            <h1 className="main-title">Product Catalogue</h1>
            <p className="subtitle">Manage your product inventory with ease</p>
          </header>
          
          <div className="row justify-content-center">
            <div className="col-12 col-lg-5 mb-5 mb-lg-0">
              <ProductForm onProductAdded={handleProductAdded} />
            </div>
            <div className="col-12 col-lg-7">
              <ProductList refreshCount={refreshCount} />
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;