import { useDispatch } from 'react-redux';
import { addCollection } from '../redux/features/collectionSlice';
import { toast } from 'react-toastify';

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault(); // Prevents the <a> tag from triggering when clicking the button
    dispatch(addCollection(item));
    toast.success("Saved to collection!", { 
      position: "top-right", 
      autoClose: 2000, 
      theme: "dark" 
    });
  };

  return (
    <a 
      href={item.url} 
      target="_blank" 
      rel="noreferrer" 
      className="group block bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
        {item.type === 'photo' ? (
          <img 
            src={item.src} 
            alt={item.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <video 
            src={item.src} 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="p-5">
        <h2 className="text-gray-200 text-sm font-medium truncate capitalize mb-4">
          {item.title}
        </h2>
        <button 
          onClick={handleSave} 
          className="w-full bg-gray-700 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
          Save to Collection
        </button>
      </div>
    </a>
  );
};

export default ResultCard;