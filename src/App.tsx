import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavbarComponent from "./components/NavbarComponent";
import WaveBorder from "./components/WaveBorder";
import Fade from 'react-reveal/Fade';

function App() {
  return (
    <BrowserRouter>
      <>
      <Fade top>

    <div>
    <NavbarComponent />
        <WaveBorder upperColor="#001f3f" lowerColor="white"  animationNegativeDelay={2} />
    </div>
      </Fade>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;


