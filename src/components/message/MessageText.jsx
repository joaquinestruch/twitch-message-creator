function MessageText({ messageText }) {
  // const formatText = (text, groupLength) => {
  //   let formattedText = '';
  //   for (let i = 0; i < text.length; i += groupLength) {
  //     formattedText += text.substr(i, groupLength);
  //     if (i + groupLength < text.length) {
  //       formattedText += '<br>';
  //     }
  //   }
  //   return formattedText;
  // };
  // const formattedText = messageText.length < 1 ? "message" : formatText(messageText);

  return (
    <p style={{ color: "white" }} className="message-text">
      {messageText.length < 1 ? "message" : messageText}
    </p>
  );
}

export default MessageText;
