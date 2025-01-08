

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import AdminLogin from "../../assets/Images/AdminLogin.jpg";
import { FaSave } from "react-icons/fa"; 

const ItemEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
    addon: "", 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Item name is required.";
    if (!formData.price) tempErrors.price = "Price is required.";
    else if (formData.price <= 0) tempErrors.price = "Price must be greater than zero.";
    if (!formData.image) tempErrors.image = "Image is required.";
    if (!formData.addon) tempErrors.addon = "Please select an addon type.";
    return tempErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const newItem = new FormData();
      newItem.append("name", formData.name);
      newItem.append("price", formData.price);
      newItem.append("image", formData.image);
      newItem.append("addon", formData.addon); 
  
      try {
        const response = await axios.post("http://localhost:5000/api/v1/products/createProduct", newItem, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 200 || response.status === 201) {
          const savedItem = response.data;
          dispatch(addProduct(savedItem));
          alert("Item saved successfully!");
          navigate("/Home");
        } else {
          console.error("Unexpected response status:", response.status);
          alert("Unexpected response from the server.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response from server:", error.response.data);
          alert(`Failed to save item: ${error.response.data.message || "Unknown error"}`);
        } else {
          console.error("Error saving item:", error.message);
          alert("Failed to save item. Please try again.");
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AdminLogin})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-70 p-4 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border ${
                errors.image ? "file:border-red-500" : "file:border-gray-300"
              } file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200`}
            />
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
          </div>

          
          <div>
            <label htmlFor="addon" className="block text-sm font-medium text-gray-700">
              Add-on Type
            </label>
            <select
              id="addon"
              name="addon"
              value={formData.addon}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.addon ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Add-on</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="pizza">Pizza</option>
            </select>
            {errors.addon && <p className="text-xs text-red-500 mt-1">{errors.addon}</p>}
          </div>

          <button
            type="submit"
            className="bg-red-600 px-8 py-2 text-white mt-4 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <FaSave /> 
            <span>Save Item</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemEdit;

