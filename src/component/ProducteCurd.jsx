import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault();

    const productWithAddons = {
      ...product,
      addons,
      quantity,
    };

    dispatch(addToCart(productWithAddons));
    toast.success('Product added successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleQuantityIncrease = (e) => {
    e.stopPropagation(); 
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = (e) => {
    e.stopPropagation();
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };


  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  const imageUrl = `http://localhost:5000/${product.image}`;

  return (
    <div
      className="bg-gradient-to-b from-white to-red-50 p-4 shadow-lg rounded-lg border hover:shadow-xl transform transition-transform duration-300 hover:scale-105 text-sm"
      onClick={handleNavigate} 
      style={{ width: '200px' }}
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-36 object-cover rounded-lg mb-3"
        onError={(e) => (e.target.src = '/placeholder.png')} 
      />
      <h3 className="font-bold text-md text-gray-800 truncate mb-2">{product.name}</h3>
      <p className="text-red-600 font-semibold text-lg mb-2">{formattedPrice}</p>
      <div className="flex items-center mb-3">
        {[...Array(4)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500 text-sm" />
        ))}
        <span className="text-gray-500 text-xs ml-1">(4.0)</span>
      </div>

  
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium">Quantity:</label>
        <div className="flex items-center space-x-2">
          <button
            className="w-8 h-8 bg-red-500 text-white rounded-full font-bold text-lg"
            onClick={handleQuantityDecrease}
          >
            -
          </button>
          <span className="text-sm">{quantity}</span>
          <button
            className="w-8 h-8 bg-red-500 text-white rounded-full font-bold text-lg"
            onClick={handleQuantityIncrease}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition"
        onClick={(e) => handleAddToCart(e)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
