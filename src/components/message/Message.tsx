import MessageText from "./MessageText";
import UsernameMessage from "./UsernameMessage";
interface MessageProps {
  username: string;
  messageText: string;
  colorUsername: string;
  embledsArray: string[];
}

function Message({
  username,
  messageText,
  colorUsername,
  embledsArray,
}: MessageProps) {
  return (
    <div className="message">
      <div className="embleds-div">
        {embledsArray?.length > 0
          ? embledsArray.map((e) => {
              return <img src={e} alt={e} key={e} />;
            })
          : ""}
      </div>

      <UsernameMessage
        messageText={messageText}
        username={username}
        colorUsername={colorUsername}
      />
      <MessageText messageText={messageText} />
    </div>
  );
}

export default Message;
