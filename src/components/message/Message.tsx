import MessageText from "./MessageText";
import UsernameMessage from "./UsernameMessage";
import { useChatStore } from "@/store/useChatStore";

function Message() {
  const { username, messageText, colorUsername, embledsArray } = useChatStore();
  
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
