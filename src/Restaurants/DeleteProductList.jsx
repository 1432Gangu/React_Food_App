import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RBackground from "../assets/Images/RBackground.jpg";

const DeleteProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/products/getAllProducts');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/deleteProduct/${id}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Failed to delete product');
      alert('Product deleted successfully!');
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(product.id);
    setEditedName(product.name);
    setEditedPrice(product.price);
  };

  const handleSave = async (product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/updateProduct/${product.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, name: editedName, price: editedPrice }),
        }
      );
      if (!response.ok) throw new Error('Failed to update product');
      alert('Product updated successfully!');
      setIsEditing(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoBack = () => {
    navigate('/AdminDashboard');
  };

  if (loading) return <p className="text-center text-lg text-white">Loading products...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${RBackground})` }}
    >
      <div className="w-full flex justify-start px-4 mt-4">
        <button
          onClick={handleGoBack}
          className="py-2 px-4 bg-green-500 bg-opacity-50 text-white rounded-full hover:bg-green-600 transition-all flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      <div className="overflow-x-auto w-full max-w-6xl">
      <h2 className="text-3xl font-semibold mb-6 text-center">Product Management</h2>
      
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-2 py-2 text-left">Item #</th>
              <th className="px-2 py-2 text-left">Product Name</th>
              <th className="px-2 py-2 text-left">Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 text-white">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-200 hover:bg-opacity-20">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing === product.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border border-gray-300 bg-transparent text-white p-2 rounded-md"
                    />
                  ) : (
                    <span>{product.name}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing === product.id ? (
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="border border-gray-300 bg-transparent text-white p-2 rounded-md"
                    />
                  ) : (
                    <span>₹{product.price}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {isEditing === product.id ? (
                    <button
                      onClick={() => handleSave(product)}
                      className="mr-2 py-2 px-4 bg-green-600 bg-opacity-50 text-white rounded-full hover:bg-green-700 transition-all"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(product)}
                      className="mr-2 py-2 px-4 bg-blue-600 bg-opacity-50 text-white rounded-full hover:bg-blue-700 transition-all"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="py-2 px-4 bg-red-600 bg-opacity-50 text-white rounded-full hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default DeleteProductList;
