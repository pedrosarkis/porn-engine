import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchVideos } from './service/videoApi';
import getRandomPornActress from './consts/RANDOMPORNS';
import {Link } from 'react-router-dom';

const VideoCard = ({ video }) => ( 
      <div className="w-full mb-4">
        <a href={video.url} target='_blank'> 
        <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
        </a>
      <h3 className="font-bold text-sm mt-2 line-clamp-2">{video.title}</h3>
      <p className="text-xs text-gray-600">0 visualizações • {video.duration}</p>
    </div>
);

const VideoPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearchValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    const data = await fetchVideos(searchTerm);
    setVideos(data);
  }

  useEffect(() => {
    const fetchInitialVideos = async () => {
      const data = await fetchVideos(getRandomPornActress());
      setVideos(data);
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
          <Search 
           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
           size={20}
           onClick={handleSearch}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoPlatform;