import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { FaArrowLeft } from "react-icons/fa"; 
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/api/v1/restaurants/getAllRestaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }

        const data = await response.json();
        setRestaurants(data.restaurants || []);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  
  const getCuisineTypeColor = (type) => {
    if (type === "veg") {
      return "bg-green-500"; 
    } else if (type === "non-veg") {
      return "bg-yellow-500";
    }
    return "bg-gray-500"; 
  };


  if (selectedRestaurant) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
        
          <button
            className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => setSelectedRestaurant(null)}
          >
            <FaArrowLeft className="inline-block mr-2" />
            
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Food for {selectedRestaurant.RestaurantName}
          </h2>
          <ProductList restaurantId={selectedRestaurant._id} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Restaurants</h2>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gray-800 text-white p-4">
                <h3 className="text-xl font-semibold">{restaurant.RestaurantName}</h3>
             
                <div
                  className={`inline-block px-3 py-1 mt-2 text-white text-sm rounded-full ${getCuisineTypeColor(restaurant.cuisineType)}`}
                >
                  {restaurant.cuisineType === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-100 text-right">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
