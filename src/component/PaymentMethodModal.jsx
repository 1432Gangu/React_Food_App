import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PaymentMethodModal = ({ isPaymentModalOpen, setIsPaymentModalOpen, handlePayment }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setIsPaymentModalOpen(false);
    navigate('/cart'); 
  };

  const notify = (method) => {
    toast.success(`Payment method selected: ${method}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    handlePayment(method);
    setIsPaymentModalOpen(false); 
  };

  return (
    <>
      <ToastContainer />
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
            <div className="mb-4">
              <button
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-3"
                onClick={() => notify('Card')}
              >
                Pay with Card
              </button>
              <button
                className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 mb-3"
                onClick={() => notify('Cash')}
              >
                Pay with Cash
              </button>
              <button
                className="w-full p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                onClick={() => notify('UPI')}
              >
                Pay with UPI
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethodModal;
