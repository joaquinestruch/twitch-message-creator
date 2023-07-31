import MessageText from "./MessageText";
import UsernameMessage from "./UsernameMessage";
function Message({
  username,
  messageText,
  colorUsername,
  embledsArray,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <div className="message">
      <div className="embleds-div" >
        {embledsArray?.length > 0
          ? embledsArray.map((e) => {
              return <img src={e} alt={e} key={crypto.randomUUID()} />;
            })
          : ""}

      </div>
      
      <UsernameMessage messageText={messageText} username={username} colorUsername={colorUsername}/>
        <MessageText messageText={messageText}/>
      

    </div>
  );
}

export default Message;
