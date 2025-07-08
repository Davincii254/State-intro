import React, { useState } from 'react';
import "./App.css"


const ListItem = ({ item }) => {
  return (
    <li className="bg-gray-50 p-3 rounded-md shadow-sm text-gray-700 flex items-center justify-between">
      {item}
    </li>
  );
};

const List = ({ items }) => {
  return (
    <ul className="list-none p-0 space-y-2">
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <div >
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          My Awesome List
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter a new item..."
            className="flex-grow p-3 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-md font-semibold
                       hover:bg-blue-700 focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add
          </button>
        </form>

        {items.length > 0 ? (
          <List items={items} />
        ) : (
          <p className="text-center text-gray-500">No items yet. Add something!</p>
        )}
      </div>
    </div>
  );
};

export default App;
