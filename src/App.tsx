import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeCreator from './pages/HomeCreator';
import AiChatGenerator from './pages/AiChatGenerator';
import TwitchAnimations from './pages/TwitchAnimations';
import PrivacyPolicy from './components/PrivacyPolicy';

const AD_LINK =
  'https://www.effectivecpmnetwork.com/d9qrth1d1?key=64aa3f92eea506cdb2fa20c105512e37';

function App(): JSX.Element {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        window.open(AD_LINK, '_blank');
      }
    };
    // Capture phase — fires before React's synthetic onClick
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <BrowserRouter>
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
