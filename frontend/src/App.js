import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Product Catalogue</h1>
      <ProductForm onProductAdded={() => setRefresh(!refresh)} />
      <ProductList refresh={refresh} />
    </div>
  );
}

export default App;
