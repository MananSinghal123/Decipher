import "./App.css";
import { DecipherPage } from "./pages/DecipherPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocationHuntPage from "./pages/LocationHuntPage";
import MorseCodeVideoPage from "./pages/MorseCodeVideoPage ";
import BinaryIPAddressPage from "./pages/BinaryIPAddressPage";
import DancingWithFlagsPage from "./pages/DancingWithFlagsPage";
import CaesarCipherPage from "./pages/CaesarCipherPage";
import DistortedImagePage from "./pages/DistortedImagePage";
import GoogleStreetViewPage from "./pages/GoogleStreetViewPage";
import GoogleLensPage from "./pages/GoogleLensPage";
import FinalAnswerPage from "./pages/FinalAnswerPage";
import RulesPage from "./pages/RulesPage";
import Brainfuck from "./pages/Brainfuck";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LocationHuntPage />} />
          <Route path="/decipher-page" element={<DecipherPage />} />
          <Route path="/binary-ip-address" element={<BinaryIPAddressPage />} />
          <Route path="/caesar-cipher" element={<CaesarCipherPage />} />
          <Route path="/distorted-image" element={<DistortedImagePage />} />
          <Route path="/google-lens" element={<GoogleLensPage />} />
          <Route
            path="/google-street-view"
            element={<GoogleStreetViewPage />}
          />
          <Route
            path="/dancing-with-flags"
            element={<DancingWithFlagsPage />}
          />
          <Route path="/brain-fuck" element={<Brainfuck />} />
          <Route path="/morse-code-video" element={<MorseCodeVideoPage />} />

          <Route path="/final-answer" element={<FinalAnswerPage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
