import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Index";
import ProfilePage from "./pages/Profile";
import {AuthProvider} from "./contexts/Auth";
import TermsOfService from "./pages/Terms";
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next';


const App = () => {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/terms" element={<TermsOfService />} />

          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </AuthProvider>
  );
}

export default App;