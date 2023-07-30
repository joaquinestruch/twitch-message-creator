import Message from "./message/Message"
import Nav from "./nav/Nav"

function Main({isModalOpen, setIsModalOpen, username, setUsername, messageText, setMessageText, colorUsername, setColorUsername, embledsArray, setEmbledsArray}) {
  return (
    <main className="container-main">
        <Nav isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} username={username} messageText={messageText} colorUsername={colorUsername} embledsArray={embledsArray} setUsername={setUsername} setMessageText={setMessageText} setColorUsername={setColorUsername} setEmbledsArray={setEmbledsArray}/>
        <Message isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  username={username} messageText={messageText} colorUsername={colorUsername} embledsArray={embledsArray}/>
    </main>
  )
}

export default Main