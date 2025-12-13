import Message from "./message/Message";
import Nav from "./nav/Nav";

interface MainProps {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  username: string;
  setUsername: (v: string) => void;
  messageText: string;
  setMessageText: (v: string) => void;
  colorUsername: string;
  setColorUsername: (v: string) => void;
  embledsArray: string[];
  setEmbledsArray: React.Dispatch<React.SetStateAction<string[]>>;
}

function Main({
  isModalOpen,
  setIsModalOpen,
  username,
  setUsername,
  messageText,
  setMessageText,
  colorUsername,
  setColorUsername,
  embledsArray,
  setEmbledsArray,
}: MainProps) {
  return (
    <>
      <main className="container-main">
        <Nav
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          username={username}
          messageText={messageText}
          colorUsername={colorUsername}
          embledsArray={embledsArray}
          setUsername={setUsername}
          setMessageText={setMessageText}
          setColorUsername={setColorUsername}
          setEmbledsArray={setEmbledsArray}
        />
        <Message
          username={username}
          messageText={messageText}
          colorUsername={colorUsername}
          embledsArray={embledsArray}
        />
      </main>
      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default Main;
