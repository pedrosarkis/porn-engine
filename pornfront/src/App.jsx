import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchVideos } from './service/videoApi';
import getRandomPornActress from './consts/RANDOMPORNS';

const VideoCard = ({ video }) => (
  <div className="w-full mb-4">
    <a href={video.url} target="_blank" rel="noopener noreferrer">
      <div className="relative w-full pb-[56.25%]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <h3 className="font-bold text-sm mt-2 line-clamp-2">{video.title}</h3>
      <p className="text-xs text-gray-600">0 visualizações • {video.duration}</p>
    </a>
  </div>
);

const SkeletonVideoCard = () => (
  <div className="w-full mb-4 animate-pulse">
    <div className="relative w-full pb-[56.25%] bg-gray-200 rounded-md"></div>
    <h3 className="font-bold text-sm mt-2 line-clamp-2 bg-gray-200 text-gray-200">Generic title only for fill the size of the container </h3>
    
    <div className="h-3 bg-gray-200 mt-1 rounded w-3/4"></div>
  </div>
);

const VideoPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchVideos(searchTerm);
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialVideos = async () => {
      setLoading(true);
      const data = await fetchVideos(getRandomPornActress());
      setVideos(data);
      setLoading(false);
    };
    fetchInitialVideos();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Porn Search Engine</h1>

      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Pesquisar vídeos..."
            value={searchTerm}
            onChange={handleSearchValue}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          >
            <Search className="text-gray-400" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonVideoCard key={index} />
            ))
          : videos.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );
};

export default VideoPlatform;