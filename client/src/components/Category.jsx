import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Category() {
  const [categories, setCategories] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
      .then((response) => {
        console.log('response data: ', response.data.categories);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleScroll = (direction) => {
    const container = document.getElementById('categoryContainer');
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollStep = container.offsetWidth;

    if (direction === 'left' && scrollPosition > 0) {
      setScrollPosition((prev) => Math.max(0, prev - scrollStep));
    } else if (direction === 'right' && scrollPosition < scrollWidth) {
      setScrollPosition((prev) => Math.min(scrollWidth, prev + scrollStep));
    }
  };

  return (
    <div className="flex flex-col bg-white mx-auto p-auto relative">
      <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
        Categories
      </h1>
      <div
        id="categoryContainer"
        className="flex overflow-hidden pb-10"
        onWheel={(e) => e.preventDefault()}
      >
        <div
          className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {categories.map((category, index) => (
            <div key={index} className="inline-block px-3">
              <div
                className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <ul className="list-disc pl-6">
                  {category.sub.map((subcategory, subIndex) => (
                    <li key={subIndex} className="mb-1">{subcategory}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 text-gray-700 text-3xl lg:text-4xl focus:outline-none hover:text-gray-900 transition-colors duration-300"
        onClick={() => handleScroll('left')}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 text-gray-700 text-3xl lg:text-4xl focus:outline-none hover:text-gray-900 transition-colors duration-300"
        onClick={() => handleScroll('right')}
      >
        &gt;
      </button>
    </div>
  );
}

export default Category