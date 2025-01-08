import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const location = useLocation();
  const product = location.state?.product; // Retrieve the product passed via state
  const dispatch = useDispatch();

  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
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

  const handleAddonChange = (addon) => {
    setAddons((prevAddons) =>
      prevAddons.includes(addon)
        ? prevAddons.filter((item) => item !== addon)
        : [...prevAddons, addon]
    );
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1);
  };

  if (!product) {
    return <p className="text-center text-lg font-medium mt-6">Product not found! Please navigate from the home page.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     
        <div className="relative">
          <img
            src={`http://localhost:5000/${product.image}`} 
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-red-600 text-xl font-semibold mb-3">${product.price}</p>
          <div className="flex items-center mb-4">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-yellow-500" />
            ))}
          </div>

          <p className="mt-4 text-gray-700 mb-6">{product.description}</p>

          
          <div className="mt-4">
            <h4 className="font-medium mb-2 text-lg">Choose Addons</h4>
            <div className="flex flex-wrap gap-3">
              {['Cheese', 'Butter', 'Jalapenos', 'Extra Sauce'].map((addon) => (
                <button
                  key={addon}
                  className={`py-2 px-4 rounded-full border-2 text-sm font-medium transition ${
                    addons.includes(addon)
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddonChange(addon);
                  }}
                >
                  {addon}
                </button>
              ))}
            </div>
          </div>

       
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-20 p-2 border rounded text-center"
            />
          </div>

          
          <button
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-all"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
