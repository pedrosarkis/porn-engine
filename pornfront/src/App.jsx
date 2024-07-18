import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Index";
import {AuthProvider} from "./contexts/Auth";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;