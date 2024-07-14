import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { fetchVideos } from './service/videoApi';
import getRandomPornActress from './consts/RANDOMPORNS';

const LanguageSelector = ({ onChangeLanguage }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-200 rounded-full"
      >
        <Globe size={24} />
      </button>
      <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {i18n.language.toUpperCase()}
      </span>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left ${
                i18n.language === lang.code ? 'bg-blue-100' : ''
              }`}
              onClick={() => {
                onChangeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
  const [allVideos, setAllVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
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

  const handleSearchValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchVideos(searchTerm);
    setAllVideos(data);
    setCurrentPage(1);
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialVideos = async () => {
      setLoading(true);
      const data = await fetchVideos(getRandomPornActress());
      setAllVideos(data);
      setLoading(false);
    };
    fetchInitialVideos();
  }, []);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allVideos.length / videosPerPage);

  const handleChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
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