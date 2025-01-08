

import React, { useState } from "react";
import AdminLogin from "../assets/Images/AdminLogin.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RestaurantDetail = () => {
  const navigate = useNavigate();
  const [newRestaurant, setNewRestaurant] = useState({
    RestaurantName: "",
    location: "",
    contactNumber: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({
      ...newRestaurant,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newRestaurant.RestaurantName.trim())
      newErrors.RestaurantName = "Restaurant name is required.";
    if (!newRestaurant.location.trim()) newErrors.location = "Location is required.";
    if (!newRestaurant.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\+?\d{10,15}$/.test(newRestaurant.contactNumber)) {
      newErrors.contactNumber = "Enter a valid contact number (10-15 digits).";
    }
    if (!newRestaurant.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRestaurant.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    
    if (!newRestaurant.description.trim())
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/createNewRestaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newRestaurant,
          }),
          
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add the restaurant");
      }

      const data = await response.json();
      toast.success("Restaurant added successfully!");
      setNewRestaurant({
        RestaurantName: "",
        location: "",
        contactNumber: "",
        email: "",
        description: "",
        category: "",
      });

     
      setTimeout(() => {
        navigate("/AdminDashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AdminLogin})` }}
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="mt-6 w-full max-w-md bg-white bg-opacity-60 shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add a New Restaurant
          </h2>
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="text-blue-600 hover:underline text-l 45"
          >
            ←
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="RestaurantName"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="RestaurantName"
              name="RestaurantName"
              value={newRestaurant.RestaurantName}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.RestaurantName ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter restaurant name"
            />
            {errors.RestaurantName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.RestaurantName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={newRestaurant.location}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.location ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={newRestaurant.contactNumber}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.contactNumber ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter contact number"
            />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newRestaurant.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newRestaurant.description}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.description ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter description"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newRestaurant.category}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
        
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantDetail;

