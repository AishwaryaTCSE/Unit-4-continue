import React from 'react';

const Card = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Beautiful Card</h2>
        <div className="flex justify-center mb-4">
          <img
            className="h-32 w-32 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=80&q=80"
            alt="Example"
          />
        </div>
        <p className="text-gray-700 text-base">
          This is a beautifully designed card using Tailwind CSS. It features rounded corners, shadow effects, and a responsive design.
        </p>
      </div>
    </div>
  );
};

export default Card;
