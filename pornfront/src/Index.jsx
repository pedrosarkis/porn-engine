import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronLeft, ChevronRight, CircleUser, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchVideos } from './service/videoApi';
import getRandomPornActress from './consts/RANDOMPORNS';
import LanguageSelector from './components/LanguageSelector';
import VideoCard from './components/VideoCard';
import SkeletonVideoCard from './components/SkeletonVideoCard';
import FilterComponent from './components/Filters';
import LoginModal from './components/Login';
import { useAuth } from './contexts/Auth';
import { addFavoriteVideo } from './service/userAPI';

import moment from 'moment';

const VideoPlatform = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const videosPerPage = 20;

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code.toLowerCase();
        
        if (['br', 'pt', 'ao', 'mz', 'cv', 'gw', 'st', 'tl', 'gq'].includes(country)) {
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
    return true;
  };

  const matchesDuration = (videoDuration, filter) => {
    const minutesFilter = parseInt(filter.split('plusMinutes')[0]) * 60;
    const [minutes, seconds] = videoDuration.split(':').map(Number);
    const videoDurationInSeconds = minutes * 60 + seconds;
    return videoDurationInSeconds >= minutesFilter;
  };

  const onToggleFavorite = async (video, isFavorite) => {
    if (isFavorite) {
      const response = await addFavoriteVideo(video);
      alert(response.message);
    } else {
      // Remove favorite
      // implement logic later
    }	
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleProfileNavigation = () => {
    navigate('/profile');
    setShowProfileOptions(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfileOptions(false);
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
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 px-4 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search className="text-white" size={20} />
          </button>
        </div>
        
        {user ? (
          <div className="relative">
            <button onClick={handleProfileClick} className="text-black mr-4">
              <CircleUser size={20} />
            </button>
            {showProfileOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={handleProfileNavigation}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <User className="inline-block mr-2" size={16} />
                  Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <LogOut className="inline-block mr-2" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-black mr-4"
          >
            Login
          </button>
        )}
        
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
          : currentVideos.map((video) => <VideoCard key={video.id} video={video} onToggleFavorite={onToggleFavorite} />)}
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

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default VideoPlatform;