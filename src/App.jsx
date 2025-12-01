import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import PrivacyPolicy from './components/PrivacyPolicy'

function App() {

  const [username, setUsername] = useState("");
  const [messageText, setMessageText] = useState("");
  const [colorUsername, setColorUsername] = useState("");
  const [embledsArray, setEmbledsArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    // Check if URL contains privacy-policy or policy-privacy
    const path = window.location.pathname;
    if (path.includes('privacy-policy') || path.includes('policy-privacy')) {
      setShowPrivacy(true);
    }
  }, []);

  if (showPrivacy) {
    return <PrivacyPolicy />;
  }

  return (
    <>
      <Header />
      <Main isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} embledsArray={embledsArray} setEmbledsArray={setEmbledsArray} setUsername={setUsername} username={username} setMessageText={setMessageText} messageText={messageText} setColorUsername={setColorUsername} colorUsername={colorUsername} />
    </>
  )
}

export default App
