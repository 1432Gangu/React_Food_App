import React from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";


function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const navigate = useNavigate();



  return (
    <nav className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
       
        <div className="text-2xl font-extrabold text-gray-800 tracking-wide hover:text-red-500 transition duration-300">
          <Link to="/">E-Shop</Link>
        </div>

      
        <div className="relative flex-1 mx-4 hidden md:block">
          <form>
            <input
              type="text"
              placeholder="Search Product"
              className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <FaSearch className="absolute top-2.5 right-4 text-gray-500 hover:text-gray-700 transition duration-300 text-lg" />
          </form>
        </div>

        
        <div className="flex items-center space-x-6">
    
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-red-500 transition duration-300"
          >
            <FaShoppingCart className="text-2xl" />
            {products.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {products.length}
              </span>
            )}
          </Link>

         
            <RiAdminFill className="text-xl" />

         
          <button className="block md:hidden text-gray-700 hover:text-red-500 transition duration-300">
            <FaUser className="text-2xl" />
          </button>
        </div>
      </div>

     
      <div className="bg-gradient-to-r from-red-100 via-white to-red-100 py-3">
        <div className="container mx-auto flex justify-center space-x-8 text-sm font-medium text-gray-700">
          <Link to="/Home" className="hover:text-red-500 transition duration-300">
            Home
          </Link>
          <Link to="/ProductList" className="hover:text-red-500 transition duration-300">
            Items
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
