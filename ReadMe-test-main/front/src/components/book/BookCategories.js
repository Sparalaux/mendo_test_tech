import React from 'react';

const BookCategories = ({ categories }) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category, index) => (
      <span
        key={index}
        className="px-3 py-1 text-sm text-white bg-black border-2 border-black rounded-full font-comic"
      >
        {category}
      </span>
    ))}
  </div>
  
);

export default BookCategories;