import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeCreator from './pages/HomeCreator';
import AiChatGenerator from './pages/AiChatGenerator';
import TwitchAnimations from './pages/TwitchAnimations';
import PrivacyPolicy from './components/PrivacyPolicy';
import DonationModal from './components/DonationModal';
import { useDonationStore } from './store/useDonationStore';

function App(): JSX.Element {
  const { incrementVisits } = useDonationStore();

  useEffect(() => {
    // Solo contar la visita una vez por carga de la app
    incrementVisits();
  }, [incrementVisits]);

  return (
    <BrowserRouter>
      <DonationModal />
      <Routes>
        <Route path="/" element={<HomeCreator />} />
        <Route path="/ai-chat" element={<AiChatGenerator />} />
        <Route path="/animations" element={<TwitchAnimations />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/policy-privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
