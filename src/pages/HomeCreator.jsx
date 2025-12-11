import { useState, useEffect } from 'react'
import '../App.css'
import Header from '../components/Header'
import Main from '../components/Main'
import PrivacyPolicy from '../components/PrivacyPolicy'

function HomeCreator() {

  const [username, setUsername] = useState("");
  const [messageText, setMessageText] = useState("");
  const [colorUsername, setColorUsername] = useState("");
  const [embledsArray, setEmbledsArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Note: The Privacy Policy check is now handled by the Router, 
  // but keeping this logic here or moving it to a separate component is fine. 
  // Since we are using a specific route for privacy policy, we likely don't need this useEffect 
  // checking window.location.pathname anymore, but I'll leave it clean in the next step.
  // actually, let's remove the manual path check since we will use Routes.

  return (
    <>
      <Header />
      <Main 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        embledsArray={embledsArray} 
        setEmbledsArray={setEmbledsArray} 
        setUsername={setUsername} 
        username={username} 
        setMessageText={setMessageText} 
        messageText={messageText} 
        setColorUsername={setColorUsername} 
        colorUsername={colorUsername} 
      />
    </>
  )
}

export default HomeCreator
