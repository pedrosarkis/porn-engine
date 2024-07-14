import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock API para simular chamadas de backend
const fetchVideos = async (page, perPage) => {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    videos: mockVideos.slice(startIndex, endIndex),
    totalPages: Math.ceil(mockVideos.length / perPage)
  };
};

// Dados mockados expandidos
const mockVideos = [
  { id: 1, title: 'Aprenda React em 1 hora', views: '100K', likes: '10K', comments: '500', thumbnail: '/api/placeholder/320/180' },
  { id: 2, title: 'Tour pela cidade de Paris', views: '500K', likes: '50K', comments: '2.5K', thumbnail: '/api/placeholder/320/180' },
  { id: 3, title: 'Receita de bolo de chocolate', views: '200K', likes: '15K', comments: '800', thumbnail: '/api/placeholder/320/180' },
  { id: 4, title: 'Dicas para produtividade', views: '150K', likes: '12K', comments: '600', thumbnail: '/api/placeholder/320/180' },
  { id: 5, title: 'Meditação guiada para iniciantes', views: '300K', likes: '25K', comments: '1.2K', thumbnail: '/api/placeholder/320/180' },
  { id: 6, title: 'Truques de mágica revelados', views: '400K', likes: '35K', comments: '1.8K', thumbnail: '/api/placeholder/320/180' },
  { id: 7, title: 'Como iniciar um podcast', views: '80K', likes: '8K', comments: '400', thumbnail: '/api/placeholder/320/180' },
  { id: 8, title: 'Rotina de exercícios em casa', views: '250K', likes: '20K', comments: '1K', thumbnail: '/api/placeholder/320/180' },
  { id: 9, title: 'Explorando a Amazônia', views: '350K', likes: '30K', comments: '1.5K', thumbnail: '/api/placeholder/320/180' },
  { id: 10, title: 'Introdução à Inteligência Artificial', views: '450K', likes: '40K', comments: '2K', thumbnail: '/api/placeholder/320/180' },
  { id: 11, title: 'Como fazer um currículo perfeito', views: '120K', likes: '11K', comments: '550', thumbnail: '/api/placeholder/320/180' },
  { id: 12, title: 'Dicas de fotografia para iniciantes', views: '180K', likes: '16K', comments: '750', thumbnail: '/api/placeholder/320/180' },
  { id: 13, title: 'História da Grécia Antiga', views: '220K', likes: '19K', comments: '900', thumbnail: '/api/placeholder/320/180' },
  { id: 14, title: 'Técnicas avançadas de jardinagem', views: '90K', likes: '7K', comments: '350', thumbnail: '/api/placeholder/320/180' },
  { id: 15, title: 'Curso completo de guitarra', views: '280K', likes: '24K', comments: '1.1K', thumbnail: '/api/placeholder/320/180' },
];

const VideoCard = ({ video }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
    <div className="relative">
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Play className="text-white" size={48} />
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2 truncate">{video.title}</h3>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{video.views} visualizações</span>
        <div className="flex space-x-2">
          <span className="flex items-center"><ThumbsUp size={16} className="mr-1" />{video.likes}</span>
          <span className="flex items-center"><MessageCircle size={16} className="mr-1" />{video.comments}</span>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center space-x-2 mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
    >
      <ChevronLeft size={20} />
    </button>
    <span>{currentPage} de {totalPages}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

const VideoPlatform = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const videosPerPage = 9;

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const { videos, totalPages } = await fetchVideos(currentPage, videosPerPage);
      setVideos(videos);
      setTotalPages(totalPages);
      setLoading(false);
    };

    loadVideos();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Plataforma de Vídeos Avançada</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default VideoPlatform;