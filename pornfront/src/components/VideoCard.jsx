import { useTranslation } from 'react-i18next';

const VideoCard = ({ video }) => {
    const { t } = useTranslation();
    
    return (
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
          <p className="text-xs text-gray-600">{t('viewCount', { count: 0 })} • {video.duration}</p>
        </a>
      </div>
    );
  };

  export default VideoCard;