export const validateProductForm = (formData) => {
  const errors = {};
  const { productName, price, image } = formData;

  // Validate product name
  if (!productName || productName.trim() === '') {
    errors.productName = 'Product name is required';
  } else if (productName.length < 2) {
    errors.productName = 'Product name must be at least 2 characters long';
  } else if (productName.length > 100) {
    errors.productName = 'Product name must be less than 100 characters';
  }

  // Validate price
  if (!price || price.toString().trim() === '') {
    errors.price = 'Price is required';
  } else if (isNaN(price)) {
    errors.price = 'Price must be a valid number';
  } else if (parseFloat(price) <= 0) {
    errors.price = 'Price must be greater than 0';
  } else if (parseFloat(price) > 1000000) {
    errors.price = 'Price must be less than 1,000,000';
  }

  // Validate image
  if (image) {
    if (image.type && !image.type.startsWith('image/')) {
      errors.image = 'File must be an image (JPG, PNG, WEBP, etc.)';
    } else if (image.size && image.size > 2 * 1024 * 1024) { // 2MB limit
      errors.image = 'Image size must be less than 2MB';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getFieldError = (fieldName, errors) => {
  return errors[fieldName] || '';
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};