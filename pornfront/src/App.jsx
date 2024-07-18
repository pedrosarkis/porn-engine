import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Index";
import ProfilePage from "./pages/Profile";
import {AuthProvider} from "./contexts/Auth";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;