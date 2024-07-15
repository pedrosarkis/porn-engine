import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchVideos } from './service/videoApi';
import getRandomPornActress from './consts/RANDOMPORNS';
import LanguageSelector from './components/LanguageSelector';
import VideoCard from './components/VideoCard';
import SkeletonVideoCard from './components/SkeletonVideoCard';
import FilterComponent from './components/Filters';
import moment from 'moment';

const VideoPlatform = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [filterBy, setFilterBy] = useState({
    dateAdded: 'all',
    duration: 'all'
  });
  const videosPerPage = 20;

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
      setFilteredVideos(data);
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
    setFilteredVideos(data);
    setCurrentPage(1);
    setLoading(false);
    setLastSearchedTerm(searchTerm);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handleChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sortedVideos = [...filteredVideos].sort((a, b) => {
      if (newSortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (newSortBy === 'duration') {
        return moment.duration(b.duration).asSeconds() - moment.duration(a.duration).asSeconds();
      } else if (newSortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.views - a.views;
    });
    setFilteredVideos(sortedVideos);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilterBy = { ...filterBy, [filterType]: value };
    setFilterBy(newFilterBy);
    
    const filteredVideos = allVideos.filter(video => {
      if (newFilterBy.dateAdded !== 'all' && !matchesDateAdded(video.dateAdded, newFilterBy.dateAdded)) return false;
      if (newFilterBy.duration !== 'all' && !matchesDuration(video.duration, newFilterBy.duration)) return false;
      return true;
    });
    
    setFilteredVideos(filteredVideos);
    setCurrentPage(1);
  };

  const matchesDateAdded = (videoDate, filter) => {
    // Implement the date filtering logic here
    return true;
  };

  const matchesDuration = (videoDuration, filter) => {
    const minutesFilter = parseInt(filter.split('plusMinutes')[0]) * 60;
    const [minutes, seconds] = videoDuration.split(':').map(Number);
    const videoDurationInSeconds = minutes * 60 + seconds;
    return videoDurationInSeconds >= minutesFilter;
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
            {lastSearchedTerm} ({filteredVideos.length} {t('results')})
          </h2>
          <FilterComponent
            sortBy={sortBy}
            filterBy={filterBy}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
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