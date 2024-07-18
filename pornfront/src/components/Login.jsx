import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/Auth';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register, loginWithGoogle } = useAuth();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLogin && !agreeToTerms) {
      setError(t('pleaseAgreeToTerms'));
      return;
    }
    let success;
    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register(email, username, password);
    }
    if (success) {
      onClose();
    } else {
      setError(isLogin ? t('invalidCredentials') : t('registrationFailed'));
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      onClose();
    } else {
      setError(t('googleLoginFailed'));
    }
  };

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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder={t('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          )}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {!isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreeToTerms" className="text-sm">
                {t('agreeToTerms')} <a href="/terms" className="text-blue-500 hover:underline">{t('termsOfService')}</a> {t('and')} <a href="/privacy" className="text-blue-500 hover:underline">{t('privacyPolicy')}</a>
              </label>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLogin ? t('logIn') : t('createAccount')}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded hover:bg-gray-50 flex items-center justify-center"
          >
            <img src="https://static-cdn77.xvideos-cdn.com/v3/img/skins/common/social/logo/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            {isLogin ? t('loginWithGoogle') : t('signUpWithGoogle')}
          </button>
        </div>
        <p className="mt-4 text-center text-sm">
          {isLogin ? t('noAccount') : t('alreadyHaveAccount')}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline ml-1">
            {isLogin ? t('signUp') : t('logIn')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;