import React, { useEffect } from "react";
import { categories, mocData } from "../assets/mocData";
import New from "../assets/Images/New.webp";
import InfoSection from "../component/InfoSection";
import CategorySection from "../component/CategorySection";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom"; 

import ProductList from "../Restaurants/ProductList";

import RestaurantList from "../Restaurants/RestaurantList";


function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mocData));
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
     
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-0 md:space-x-4">
         
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-2 py-2.5 rounded-t-md">
              SHOP BY CATEGORIES
            </div>
            <ul className="space-y-4 bg-white p-4 border rounded-b-md shadow">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-red-500 transition"
                >
                  <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                  {category}
                </li>
              ))}
            </ul>
          </div>

        
          <div className="w-full md:w-9/12 h-96 relative rounded-md overflow-hidden shadow-lg">
            <img
              src={New}
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-16 left-8 space-y-4">
              <p className="text-4xl md:text-5xl font-bold text-white">
                FOOD ORDER APP
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-red-500">
                PLACE YOUR ORDER WHAT YOU WANT
              </h2>
              <p className="text-xl md:text-3xl font-bold text-gray-200">
                MILLION+ ITEMS
              </p>
              <button className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 text-white mt-4 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        
        <RestaurantList/>
        <InfoSection />
       
        <CategorySection />
        <div>
        </div>
      </div>

    
      <ProductList />
    </div>
  );
}

export default Home;


