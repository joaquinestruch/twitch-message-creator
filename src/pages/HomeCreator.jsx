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

  useEffect(() => {
    document.title = "Fake Twitch Chat Generator - Free Message Editor";
  }, []);

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
      
      {/* SEO Content */}
      <section style={{maxWidth: '1000px', margin: '60px auto', padding: '0 20px', color: '#adadb8', fontFamily: 'Inter, sans-serif'}}>
        <h1 style={{color: '#efeff1', fontSize: '2rem', marginBottom: '20px'}}>Fake Twitch Chat Generator & Message Editor</h1>
        <p style={{marginBottom: '15px', lineHeight: '1.6'}}>
            Create <strong>fake Twitch chat messages</strong> instantly with our powerful editor. Perfect for making memes, 
            editing videos, or pranking your friends. This <strong>Twitch Message Creator</strong> allows you to customize username, 
            colors, badges (Mod, VIP, Prime, Sub), and emotes.
        </p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px'}}>
            <div>
                <h2 style={{color: '#a970ff', fontSize: '1.4rem'}}>How to Create Fake Stream Chats</h2>
                <ul style={{listStyle: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
                    <li><strong>Enter Details:</strong> Choose a username, write your message, and pick a color.</li>
                    <li><strong>Add Badges:</strong> Make it authentic with Moderator, Subscriber, or Verified badges.</li>
                    <li><strong>Download Image:</strong> Capture the result as a high-quality PNG.</li>
                </ul>
            </div>
            <div>
                 <h2 style={{color: '#a970ff', fontSize: '1.4rem'}}>Why use this tool?</h2>
                 <p>
                    From YouTubers editing content to streamers making thumbnails, our <strong>Fake Twitch Chat Generator</strong> 
                    provides the most realistic simulation available. No login required, highly customizable, and completely free.
                 </p>
            </div>
        </div>
      </section>
    </>
  )
}

export default HomeCreator
