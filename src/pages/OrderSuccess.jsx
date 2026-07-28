import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  // අදින් දවස් 3කට පසු දිනය සාදා ගැනීම
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl text-center">
        
        {/* හරියක් (Tick) පෙන්වන Icon එක */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
          <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          Order Successful!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          ඔබගේ ඇණවුම සාර්ථකයි. අපි එය ඉක්මනින්ම ඔබ වෙත ගෙන ඒමට කටයුතු කරමින් සිටිමු.
        </p>

        {/* Delivery විස්තර සහ පින්තූරය */}
        <div className="mt-6 border-t border-b border-gray-100 py-6 bg-blue-50 rounded-lg">
           <img 
             src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png" 
             alt="Delivery Box" 
             className="w-24 h-24 mx-auto mb-4 drop-shadow-md" 
           />
           <h3 className="text-lg font-bold text-gray-800">Estimated Delivery Date</h3>
           <p className="text-xl text-blue-600 font-bold mt-2">{formattedDate}</p>
           <p className="text-sm text-gray-500 mt-1">(Within 3-5 Working Days)</p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/myOrders" 
            className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition duration-300"
          >
            View My Orders
          </Link>
        </div>

      </div>
    </div>
  );
}