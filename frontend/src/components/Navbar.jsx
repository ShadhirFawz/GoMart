import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
            {/* GO Text with larger font */}
            <text 
              fontFamily="Arial, sans-serif" 
              fontSize="100" 
              fontWeight="bold" 
              fill="#ffffff"
            >
              GO
            </text>
            
            {/* Shopping Cart SVG - Properly sized and positioned */}
            <AiOutlineShoppingCart 
              x="65" 
              y="20" 
              size={40} 
              color="#ffffff" 
              className="cart-icon"
            />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;