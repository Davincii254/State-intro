
import React, { useState } from 'react';


import "./App.css"

/**
 * ListItem Component
 * -------------------
 * Use Case: To display a single item in the list.
 * This is a "presentational" or "dumb" component because it doesn't manage any state.
 * Its only job is to receive data (via props) and display it.
 *
 * @param {object} props - The properties passed from the parent component.
 * @param {string} props.item - The text of the list item to display.
 */
const ListItem = ({ item }) => {
  // This component returns a single list item element (<li>).
  // The text of the item is rendered inside the <li>.
  // The `className` attribute is used to apply Tailwind CSS classes for styling.
  return (
    <li className="bg-gray-50 p-3 rounded-md shadow-sm text-gray-700 flex items-center justify-between">
      {item}
    </li>
  );
};


/**
 * List Component
 * --------------
 * Use Case: To display the entire list of items.
 * This component takes an array of items and renders a ListItem for each one.
 *
 * @param {object} props - The properties passed from the parent component.
 * @param {string[]} props.items - An array of strings to be rendered as a list.
 */
const List = ({ items }) => {
  // This component returns an unordered list (<ul>).
  // The `className` attribute styles the <ul> element.
  return (
    <ul className="list-none p-0 space-y-2">
      {/*
        The .map() method is used to iterate over the 'items' array.
        For each 'item' in the array, it creates and returns a <ListItem> component.
      */}
      {items.map((item, index) => (
        // The <ListItem> component is used to render the individual item.
        // `item={item}` passes the current item's text down as a prop.
        // `key={index}` is a special, required prop in React for lists.
        // It helps React identify which items have changed, are added, or are removed,
        // which improves performance during re-renders. Using the index is okay for
        // simple lists where items are not re-ordered, but a unique ID is better practice.
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
};


/**
 * App Component
 * -------------
 * Use Case: The main component of the application.
 * This is a "container" or "smart" component because it manages the application's state and logic,
 * such as handling user input and updating the list.
 */
const App = () => {
  // State for the input field's current value.
  // `inputValue` stores the text the user is typing.
  // `setInputValue` is the function we use to update that text.
  // It starts as an empty string ('').
  const [inputValue, setInputValue] = useState('');

  // State for the list of items.
  // `items` is an array that holds all the strings added by the user.
  // `setItems` is the function to update this array.
  // It starts as an empty array ([]).
  const [items, setItems] = useState([]);


  /**
   * Handles changes to the input field.
   * Use Case: This function is called every time the user types a character in the input box.
   * @param {object} event - The browser's native event object from the `onChange` event.
   */
  const handleChange = (event) => {
    // It updates the `inputValue` state to match what's currently in the input box.
    // `event.target.value` contains the current text of the input element.
    setInputValue(event.target.value);
  };


  /**
   * Handles the form submission.
   * Use Case: This function is called when the user clicks the "Add" button or presses Enter in the input field.
   * @param {object} event - The browser's native event object from the `onSubmit` event.
   */
  const handleSubmit = (event) => {
    // `event.preventDefault()` stops the browser's default behavior of reloading the page on form submission.
    event.preventDefault();

    // Check if the input value is not empty after trimming whitespace.
    // This prevents adding empty strings to the list.
    if (inputValue.trim() !== '') {
      // Update the `items` state by creating a new array.
      // The spread syntax `[...items]` copies the existing items,
      // and `, inputValue` adds the new item to the end of the new array.
      // It's crucial to create a new array rather than modifying the existing one
      // to trigger React's re-rendering process correctly.
      setItems([...items, inputValue]);

      // Clear the input field by resetting its state to an empty string.
      // This provides a better user experience after an item is added.
      setInputValue('');
    }
  };


  // The JSX returned by the App component, which describes the UI.
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          My Awesome List
        </h1>

        {/*
          The form element wraps the input and button.
          `onSubmit={handleSubmit}` links the form's submission event to our handleSubmit function.
        */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            // `value={inputValue}` makes this a "controlled component". The input's displayed value
            // is controlled by our React state (`inputValue`).
            value={inputValue}
            // `onChange={handleChange}` calls our handleChange function every time the user types.
            onChange={handleChange}
            placeholder="Enter a new item..."
            className="flex-grow p-3 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit" // This makes the button trigger the form's `onSubmit` event when clicked.
            className="px-5 py-3 bg-blue-600 text-white rounded-md font-semibold
                       hover:bg-blue-700 focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add
          </button>
        </form>

        {/*
          This is an example of Conditional Rendering.
          The ternary operator `(condition ? expressionIfTrue : expressionIfFalse)` is used here.
          If the 'items' array has items in it (its length is greater than 0),
          it renders the <List> component.
          Otherwise, it renders a paragraph telling the user to add items.
        */}
        {items.length > 0 ? (
          // Renders the List component and passes the `items` array to it as a prop.
          <List items={items} />
        ) : (
          <p className="text-center text-gray-500">No items yet. Add something!</p>
        )}
      </div>
    </div>
  );
};

// This line exports the App component so it can be imported and used in other files,
// typically the main entry point of the application, `index.js`.
export default App;