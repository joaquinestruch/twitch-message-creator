function MessageText({ messageText }) {
  const formatText = (text) => {
    const words = text.split(' ');
    const groupedWords = [];
    while (words.length > 0) {
      groupedWords.push(words.splice(0, 5).join(' '));
    }
    return groupedWords.join('<br>');
  };

  const formattedText = messageText.length < 1 ? "message" : formatText(messageText);

  return (
    <p style={{ color: "white" }} className="message-text">
      <span dangerouslySetInnerHTML={{ __html: formattedText }} />
    </p>
  );
}

export default MessageText