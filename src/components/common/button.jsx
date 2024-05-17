import React from 'react';

const Button = ({ color, content, onClick }) => {
  return (
    <button
      className={`px-4 py-3 ${color} rounded-lg flex justify-center items-center text-gray-50 text-lg font-semibold`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
