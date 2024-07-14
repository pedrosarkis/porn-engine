import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import '../../i18n';

const LanguageSelector = ({ onChangeLanguage }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
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

  useEffect(() => {
    setCurrentLang(i18n.language || 'en');
  }, [i18n.language]);

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
        {currentLang.toUpperCase()}
      </span>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left ${
                currentLang === lang.code ? 'bg-blue-100' : ''
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

export default LanguageSelector;