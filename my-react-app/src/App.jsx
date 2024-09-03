import "./App.css";
import { DecipherPage } from "./pages/DecipherPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocationHuntPage from "./pages/LocationHuntPage";
import MorseCodeVideoPage from "./pages/MorseCodeVideoPage ";
import LLMChatbotPage from "./pages/LLMChatbotPage";
import BinaryIPAddressPage from "./pages/BinaryIPAddressPage";
import DancingWithFlagsPage from "./pages/DancingWithFlagsPage";
import CaesarCipherPage from "./pages/CaesarCipherPage";
import DistortedImagePage from "./pages/DistortedImagePage";
import GoogleStreetViewPage from "./pages/GoogleStreetViewPage";
import GoogleLensPage from "./pages/GoogleLensPage";
import FinalAnswerPage from "./pages/FinalAnswerPage";
import RulesPage from "./pages/RulesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import RegisterTeamPage from "./pages/RegisterTeamPage";
import DisableBackNavigation from "./DisableBackNavigation";

function App() {
  return (
    <>
      {/* <DisableBackNavigation /> */}
      <BrowserRouter>
        <DisableBackNavigation />
        <Routes>
          <Route path="/decipher-page" element={<DecipherPage />} />
          <Route path="/location-hunt" element={<LocationHuntPage />} />
          <Route path="/morse-code-video" element={<MorseCodeVideoPage />} />
          <Route path="/llm-chatbot" element={<LLMChatbotPage />} />
          <Route path="/binary-ip-address" element={<BinaryIPAddressPage />} />
          <Route
            path="/dancing-with-flags"
            element={<DancingWithFlagsPage />}
          />

          <Route path="/caesar-cipher" element={<CaesarCipherPage />} />
          <Route path="/distorted-image" element={<DistortedImagePage />} />
          <Route
            path="/google-street-view"
            element={<GoogleStreetViewPage />}
          />
          <Route path="/google-lens" element={<GoogleLensPage />} />
          <Route path="/final-answer" element={<FinalAnswerPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/" element={<RegisterTeamPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
