import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabs } from '../redux/features/searchSlice';

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);
  const tabs = ['photos', 'videos'];

  return (
    <div className="flex justify-center mt-8 mb-10">
      <div className="bg-gray-800/80 p-1 rounded-full flex shadow-inner backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch(setActiveTabs(tab))}
            className={`px-8 py-2.5 rounded-full capitalize font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;