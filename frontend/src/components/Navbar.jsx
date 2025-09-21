import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <svg 
            width="150" 
            height="60" 
            viewBox="0 0 100 100" 
            className="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* GO Text with larger font */}
            <text 
              x="15" 
              y="80" 
              fontFamily="Arial, sans-serif" 
              fontSize="60" 
              fontWeight="bold" 
              fill="#ffffff"
              className="logo-text"
            >
              GO
            </text>
            
            {/* Shopping Cart SVG - Properly sized and positioned */}
            <g className="cart-animation" transform="translate(110, 15)">
              {/* Cart body */}
              <rect 
                x="10" 
                y="30" 
                width="40" 
                height="30" 
                rx="5"
                fill="none" 
                stroke="#ff6b6b" 
                strokeWidth="4"
                className="cart-body"
              />
              
              {/* Cart wheel 1 */}
              <circle 
                cx="20" 
                cy="65" 
                r="6" 
                fill="#ff6b6b" 
                className="cart-wheel"
              />
              
              {/* Cart wheel 2 */}
              <circle 
                cx="40" 
                cy="65" 
                r="6" 
                fill="#ff6b6b" 
                className="cart-wheel"
              />
              
              {/* Cart handle */}
              <path 
                d="M25,25 Q30,15 35,25" 
                stroke="#ff6b6b" 
                strokeWidth="4" 
                fill="none"
                strokeLinecap="round"
                className="cart-handle"
              />
              
              {/* Items in cart (animated) */}
              <circle 
                cx="25" 
                cy="42" 
                r="5" 
                fill="#4ecdc4" 
                className="cart-item"
              />
              <circle 
                cx="35" 
                cy="40" 
                r="4" 
                fill="#45b7d1" 
                className="cart-item"
              />
            </g>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;