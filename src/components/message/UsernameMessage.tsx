interface UsernameMessageProps {
  username: string;
  colorUsername: string;
  messageText?: string; // It receives messageText but doesn't use it, cleaning up or typing it optional.
}

function UsernameMessage({ username, colorUsername }: UsernameMessageProps) {
  return (
    <p className="username" style={{ color: colorUsername }}>
      {username.length < 1 ? "username" : username}
      <span style={{ color: "white" }}>:</span>
    </p>
  );
}

export default UsernameMessage;
