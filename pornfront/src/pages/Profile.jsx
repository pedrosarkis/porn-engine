import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Edit2, Share2, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/Auth';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('videos');

  // Mockup user data
  const userMock = {
    username: 'Ecmabjoosvft',
    age: '20',
    profileViews: 0,
    subscribers: 0,
    joinDate: '18 de julho de 2024',
    aboutMe: '',
  };

  const tabs = [
    { id: 'favorites', label: t('favorites') },
    { id: 'playlists', label: t('Playlists') },
  ];

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-bold text-red-600 mb-4 sm:mb-0">{userMock.username}</h1>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-200 rounded-full">
                  <Edit2 size={20} />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <Share2 size={20} />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-32 h-32 bg-gray-300 rounded-md flex items-center justify-center">
                <User size={64} />
              </div>
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Idade:</p>
                    <p>{userMock.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Acessos ao perfil:</p>
                    <p>{userMock.profileViews}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Assinantes:</p>
                    <p>{userMock.subscribers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Inscrito:</p>
                    <p>{userMock.joinDate}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 text-center ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'videos' && (
              <p className="text-gray-600">Nenhum vídeo disponível.</p>
            )}
            {activeTab === 'photos' && (
              <p className="text-gray-600">Nenhuma foto disponível.</p>
            )}
            {activeTab === 'playlists' && (
              <p className="text-gray-600">Nenhuma playlist disponível.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;