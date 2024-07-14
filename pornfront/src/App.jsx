import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchVideos } from './service/videoApi';
import getRandomPornActress from './consts/RANDOMPORNS';
import LanguageSelector from './components/LanguageSelector';

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
        <p className="text-xs text-gray-600">{t('viewCount', { count: video.views })} • {video.duration}</p>
      </a>
    </div>
  );
};

const SkeletonVideoCard = () => (
  <div className="w-full mb-4 animate-pulse">
    <div className="relative w-full pb-[56.25%] bg-gray-200 rounded-md"></div>
    <h3 className="font-bold text-sm mt-2 line-clamp-2 bg-gray-200 text-gray-200">Generic title only for fill the size of the container </h3>
    <div className="h-3 bg-gray-200 mt-1 rounded w-3/4"></div>
  </div>
);

const VideoPlatform = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [filterBy, setFilterBy] = useState({
    dateAdded: 'all',
    duration: 'all'
  });
  const videosPerPage = 20;

  const dateAddedOptions = [
    'all',
    'past24hours',
    'past2days',
    'pastWeek',
    'pastMonth',
    'past3months',
    'pastYear'
  ];

  const durationOptions = [
    'all',
    '1plusMinutes',
    '5plusMinutes',
    '10plusMinutes',
    '20plusMinutes',
    '30plusMinutes',
    '60plusMinutes',
    '0to10minutes',
    '0to20minutes'
  ];

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code.toLowerCase();
        
        if (['br', 'pt'].includes(country)) {
          i18n.changeLanguage('pt');
        } else if (['es', 'mx', 'ar', 'co', 've', 'cl', 'pe', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy'].includes(country)) {
          i18n.changeLanguage('es');
        } else {
          i18n.changeLanguage('en');
        }
      } catch (error) {
        console.error('Error detecting language:', error);
        i18n.changeLanguage('en');
      }
    };

    detectLanguage();
  }, [i18n]);

  useEffect(() => {
    const fetchInitialVideos = async () => {
      setLoading(true);
      const initialTerm = getRandomPornActress();
      const data = await fetchVideos(initialTerm);
      setAllVideos(data);
      setLoading(false);
      setLastSearchedTerm(initialTerm);
    };
    fetchInitialVideos();
  }, []);

  const handleSearchValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchVideos(searchTerm);
    setAllVideos(data);
    setCurrentPage(1);
    setLoading(false);
    setLastSearchedTerm(searchTerm);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allVideos.length / videosPerPage);

  const handleChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sortedVideos = [...allVideos].sort((a, b) => {
      if (newSortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (newSortBy === 'duration') {
        return b.duration - a.duration;
      } else if (newSortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.views - a.views;
    });
    setAllVideos(sortedVideos);
  };

  const handleFilterChange = (filterType, value) => {
    setFilterBy(prev => ({ ...prev, [filterType]: value }));
    const filteredVideos = allVideos.filter(video => {
      if (filterBy.dateAdded !== 'all' && !matchesDateAdded(video.dateAdded, filterBy.dateAdded)) return false;
      if (filterBy.duration !== 'all' && !matchesDuration(video.duration, filterBy.duration)) return false;
      return true;
    });
    setAllVideos(filteredVideos);
  };

  const matchesDateAdded = (videoDate, filter) => {
    // Implement logic to check if video date matches the filter
    // This is a placeholder and should be replaced with actual logic
    return true;
  };

  const matchesDuration = (videoDuration, filter) => {
    // Implement logic to check if video duration matches the filter
    // This is a placeholder and should be replaced with actual logic
    return true;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('title')}</h1>

      <div className="mb-6 flex justify-center items-center">
        <div className="relative w-full max-w-xl mr-4">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchValue}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          >
            <Search className="text-gray-400" size={20} />
          </button>
        </div>
        <LanguageSelector onChangeLanguage={handleChangeLanguage} />
      </div>

      {lastSearchedTerm && !loading && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {lastSearchedTerm} ({allVideos.length} {t('results')})
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">{t('sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="popularity">{t('popularity')}</option>
                <option value="date">{t('date')}</option>
                <option value="duration">{t('duration')}</option>
                <option value="rating">{t('rating')}</option>
              </select>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-medium mr-2">{t('filterBy')}:</span>
              <select
                value={filterBy.dateAdded}
                onChange={(e) => handleFilterChange('dateAdded', e.target.value)}
                className="border rounded px-2 py-1"
              >
                {dateAddedOptions.map(option => (
                  <option key={option} value={option}>{t(`dateAdded.${option}`)}</option>
                ))}
              </select>
              <select
                value={filterBy.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="border rounded px-2 py-1"
              >
                {durationOptions.map(option => (
                  <option key={option} value={option}>{t(`durationFilter.${option}`)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: videosPerPage }).map((_, index) => (
              <SkeletonVideoCard key={index} />
            ))
          : currentVideos.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>

      {!loading && (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="mx-2">
            {t('pagination', { current: currentPage, total: totalPages })}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-2 px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlatform;