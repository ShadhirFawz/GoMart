# GoMart System - Product Listing System

## Overview

The **GoMart System** is a full-stack application built with React and Laravel for managing product inventory. It supports product management, image uploads, real-time notifications, and a responsive, modern UI. This project is designed for scalability and ease of use, with comprehensive client- and server-side validation.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Configuration](#configuration)
9. [UI Components](#ui-components)
10. [Validation Rules](#validation-rules)

## Features

- **Product Management**: Add products with Name, Price and Image (optional).
- **Image Upload**: Optional product image uploads with validation (max 2MB, specific formats).
- **Real-time Notifications**: Toast messages for success, error, warning, and info states.
- **Responsive Design**: Seamless experience on desktop and mobile devices.
- **Form Validation**: Robust client- and server-side validation for data integrity.
- **Modern UI**: Bootstrap-based interface with custom animations for a professional UX.

## Tech Stack

### Frontend

- **React 18**: Frontend framework for dynamic UI.
- **Bootstrap 5**: Styling and UI components.
- **Axios**: HTTP client for API requests.
- **Context API**: State management for toast notifications.
- **CSS3**: Custom animations and styling.

### Backend

- **Laravel 11**: PHP framework for robust API development.
- **MySQL**: Relational database for product storage.
- **File Storage**: Local storage for product images.
- **CORS**: Configured for secure cross-origin requests.

## Prerequisites

- **Node.js**: V22.4 or higher
- **PHP**: v8.4 or higher
- **Composer**: Dependency manager for PHP
- **MySQL**: v10.4 or higher
- **Git**: For version control

## Installation & Setup

### Backend (Laravel) Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Set up environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Configure database in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=gomart
   DB_USERNAME=root
   DB_PASSWORD=
   ```
5. Run migrations:
   ```bash
   php artisan migrate
   ```
6. Start the server:
   ```bash
   php artisan serve
   ```
   The backend will run on `http://localhost:8000`.

### Frontend (React) Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file in frontend root:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Project Structure

```
GoMart/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Models/
│   │   │   └── Product.php
│   │   └── Http/
│   │       └── Controllers/
│   │           └── ProductController.php
│   ├── database/
│   │   └── migrations/
│   │
│   └── storage/
│       └── app/public/products/  # Image storage
├── frontend/                # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ToastContainer.jsx
│   │   ├── contexts/
│   │   │   └── ToastContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   └── App.js
│   └── package.json
└── README.md
```

## Database Schema

### Products Table

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255) NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## API Endpoints

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| GET    | `/api/products` | Retrieve all products |
| POST   | `/api/products` | Create a new product  |

### Example API Request

```javascript
// Create product
const formData = new FormData();
formData.append("product_name", "Example Product");
formData.append("price", 29.99);
formData.append("image", imageFile); // Optional

axios.post("/api/products", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

## Configuration

### Backend Configuration

- **CORS**: Configured to allow requests from the frontend domain.
- **File Storage**: Images stored in `storage/app/public/products`.
- **Validation**: Enforces product name uniqueness and price constraints.

### Frontend Configuration

- **API Base URL**: Set via `REACT_APP_API_BASE_URL` in `.env`.
- **Toast System**: Global notification system with auto-dismiss.
- **Image Handling**: Fallback to placeholder initials for missing images.

## UI Components

### ProductForm

- Form for adding products.
- Real-time validation with error feedback.
- Image upload with preview and loading states.

### ProductList

- Responsive grid layout for product display.
- Card-based design with image placeholders.
- Loading states for better UX.

### Toast System

- Displays success, error, warning, and info notifications.
- Auto dismiss with timeout.

## Validation Rules

### Frontend Validation

- **Product Name**: Required, 2-100 characters.
- **Price**: Required, positive number, max 1,000,000.
- **Image**: Optional, must be image (jpeg, png, jpg, gif), max 2MB.

## Troubleshooting

### Common Issues

- **CORS Errors**:
  - Ensure backend CORS allows the frontend domain.
  - Check `cors.php` in Laravel configuration.
- **Image Upload Issues**:
  - Verify `storage` directory has write permissions.
  - Run `php artisan storage:link`.
- **Database Connection**:
  - Confirm MySQL is running.
  - Verify `.env` database credentials.
- **API Connection**:
  - Ensure backend server runs on port 8000.
  - Check `REACT_APP_API_BASE_URL` in frontend `.env`.
