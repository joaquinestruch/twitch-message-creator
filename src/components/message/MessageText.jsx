
function MessageText({messageText}) {
  return (
    <p style={{color:"white"}} className="message-text">
        {messageText.length < 1 ? "message" : messageText}
    </p>
  )
}

export default MessageText