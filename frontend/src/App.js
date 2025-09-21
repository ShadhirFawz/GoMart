import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ToastContainer from './components/ToastContainer';
import Navbar from './components/Navbar';
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
        <Navbar />
        <ToastContainer />
        <div className="container-fluid py-4 mt-2"> {/* Changed to container-fluid and added mt-5 */}
          <div className="row">
            {/* Fixed width form column */}
            <div className="col-12 col-lg-4 col-xl-4 mb-5 mb-lg-0">
              <div className="sticky-top" style={{top: '100px'}}> {/* Make form sticky */}
                <ProductForm onProductAdded={handleProductAdded} />
              </div>
            </div>
            
            {/* Flexible products column that takes remaining space */}
            <div className="col-12 col-lg-8 col-xl-8">
              <div className="ps-lg-4"> {/* Add some spacing on larger screens */}
                <ProductList refreshCount={refreshCount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;