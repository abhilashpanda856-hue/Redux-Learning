import axios from 'axios';

const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
const pexelsKey = import.meta.env.VITE_PEXELS_KEY;

export const fetchPhotos = async (query) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query, page: 1, per_page: 20 },
    headers: { Authorization: `Client-ID ${unsplashKey}` }
  });
  
  return response.data.results.map((item) => ({
    id: item.id,
    type: 'photo',
    title: item.alt_description || 'Photo',
    thumbnail: item.urls.small,
    src: item.urls.full,
    url: item.links.html
  }));
};

export const fetchVideos = async (query) => {
  const response = await axios.get(`https://api.pexels.com/videos/search`, {
    params: { query, per_page: 15 },
    headers: { Authorization: pexelsKey }
  });
  
  return response.data.videos.map((item) => ({
    id: item.id.toString(),
    type: 'video',
    title: item.user.name || 'Video',
    thumbnail: item.image,
    src: item.video_files[0].link,
    url: item.url
  }));
};