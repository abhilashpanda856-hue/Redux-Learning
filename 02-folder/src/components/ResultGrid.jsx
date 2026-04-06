import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResults, setLoading, setError } from '../redux/features/searchSlice';
import { fetchPhotos, fetchVideos } from '../api/mediaApi';
import ResultCard from './ResultCard';

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    const getData = async () => {
      if (!query) return;

      try {
        dispatch(setLoading(true));
        let data = [];

        if (activeTab === 'photos') {
          data = await fetchPhotos(query);
        } else if (activeTab === 'videos') {
          data = await fetchVideos(query);
        }

        dispatch(setResults(data)); 
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    getData();
  }, [query, activeTab, dispatch]);

  if (!query) return (
    <div className="flex justify-center items-center h-64">
      <h1 className="text-gray-500 text-xl font-medium">Type something above to start exploring...</h1>
    </div>
  );
  
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-64">
      <h1 className="text-red-400 bg-red-400/10 px-6 py-3 rounded-lg border border-red-500/20">Oops! {error}</h1>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ResultGrid;