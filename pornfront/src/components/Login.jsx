import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
  
    const toggleView = () => setIsLogin(!isLogin);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{isLogin ? t('logIn') : t('createAccount')}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <form className="space-y-4">
            <input
              type="email"
              placeholder={t('email')}
              className="w-full p-2 border rounded"
            />
            {!isLogin && (
              <input
                type="text"
                placeholder={t('username')}
                className="w-full p-2 border rounded"
              />
            )}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isLogin && (
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm">{t('agreeTerms')}</span>
              </label>
            )}
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {isLogin ? t('logIn') : t('createAccount')}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">{t('orContinueWith')}</span>
          </div>
          <button className="w-full mt-2 border border-gray-300 p-2 rounded flex items-center justify-center">
            <img src="https://static-cdn77.xvideos-cdn.com/v3/img/skins/common/social/logo/google.svg" alt="Google logo" className="mr-2" />
            Google
          </button>
          <p className="mt-4 text-center text-sm">
            {isLogin ? t('noAccount') : t('alreadyHaveAccount')}
            <button onClick={toggleView} className="text-blue-500 hover:underline">
              {isLogin ? t('signUp') : t('logIn')}
            </button>
          </p>
        </div>
      </div>
    );
};

export default LoginModal;
