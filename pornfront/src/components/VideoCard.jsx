import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Star } from 'lucide-react';
import { useAuth } from '../contexts/Auth'; 

const VideoCard = ({ video, onToggleFavorite }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(video.isFavorite || false);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite(video, !isFavorite);
  };

  return (
    <div className="w-full mb-4 relative">
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full pb-[56.25%]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
          {user && (
            <button
              onClick={handleToggleFavorite}
              className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full"
            >
              <Star
                size={20}
                className={`${
                  isFavorite ? 'text-yellow-400 fill-current' : 'text-white'
                }`}
              />
            </button>
          )}
        </div>
        <h3 className="font-bold text-sm mt-2 line-clamp-2">{video.title}</h3>
        <p className="text-xs text-gray-600">
          <span className="inline-block">
            <Clock size={13} />
          </span>{' '}
          {video.duration}
        </p>
      </a>
    </div>
  );
};

export default VideoCard;