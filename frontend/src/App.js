import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { ToastProvider } from './context/ToastContext';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <ToastProvider>
      <div className="app-container">
        <div className="container py-5">
          <header className="text-center mb-5">
            <h1 className="main-title">Product Catalogue</h1>
            <p className="subtitle">Manage your product inventory with ease</p>
          </header>
          
          <div className="row justify-content-center">
            <div className="col-12 col-lg-5 mb-5 mb-lg-0">
              <ProductForm onProductAdded={() => setRefresh(!refresh)} />
            </div>
            <div className="col-12 col-lg-7">
              <ProductList refresh={refresh} />
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;