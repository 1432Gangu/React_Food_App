import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import emptyCartImage from '../assets/Images/emtycart1.gif';
import { FaTrashAlt } from 'react-icons/fa';
import { increment, decrement, removeFromCart } from '../redux/cartSlice';
import OrderConfirmationModal from '../component/OrderConfirmationModal';
import PaymentMethodModal from '../component/PaymentMethodModal';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [address, setAddress] = useState('Main Street thilai Nagara, 0012');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleProceedToOrder = () => {
    setIsModalOpen(true);
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setIsPaymentModalOpen(false);
    alert(`You selected ${method} as the payment method.`);
  };

  
  const formatPriceInINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">SHOPPING CART</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
            <div className="col-span-2 space-y-4">
              {cart.products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded shadow">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-500">{formatPriceInINR(product.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => dispatch(decrement(product.id))}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => dispatch(increment(product.id))}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold">
                      {formatPriceInINR(product.quantity * product.price)} 
                    </p>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
         
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">CART TOTAL</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{cart.totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Address</span>
                  <span>{address}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Price</span>
                  <span>{formatPriceInINR(cart.totalPrice)}</span> 
                </div>
              </div>
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={handleProceedToOrder}
              >
                Proceed to Order
              </button>
            </div>
          </div>
         
          <PaymentMethodModal
            isPaymentModalOpen={isPaymentModalOpen}
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            handlePayment={handlePayment}
          />
          <OrderConfirmationModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            cart={cart}
            address={address}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={emptyCartImage} alt="Empty Cart" className="w-64 h-64" />
          <p className="text-lg font-medium mt-4">Your cart is empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
