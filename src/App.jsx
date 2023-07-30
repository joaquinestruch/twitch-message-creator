import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
function App() {
  
  const [username, setUsername] = useState(""); 
  const [messageText, setMessageText] = useState("");
  const [colorUsername, setColorUsername] = useState("");
  const [embledsArray, setEmbledsArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header/>
      <Main isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} embledsArray={embledsArray} setEmbledsArray={setEmbledsArray} setUsername={setUsername} username={username} setMessageText={setMessageText} messageText={messageText} setColorUsername={setColorUsername} colorUsername={colorUsername}/>
    </>
  )
}

export default App
