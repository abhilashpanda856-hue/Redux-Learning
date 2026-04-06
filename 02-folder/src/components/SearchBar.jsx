import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';

const SearchBar = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(setQuery(text));
    setText(''); // clear after search
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-10">
      <form onSubmit={submitHandler} className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search for high-res photos or videos..."
          className="w-full bg-gray-800/50 text-white border border-gray-700 px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400 text-lg shadow-lg backdrop-blur-sm"
        />
        <button
          type="submit"
          className="absolute right-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full font-medium transition-colors duration-200 shadow-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;