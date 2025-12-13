import React from "react";
import { ChatMessage } from "@/types";
import { parseWithEmotes } from "@/utils/chatUtils";

interface ChatDisplayProps {
  visibleMessages: ChatMessage[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
  isObsMode: boolean;
  isStreaming: boolean;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  visibleMessages,
  chatContainerRef,
  isObsMode,
  isStreaming,
}) => {
  return (
    <div
      id="ai-capture-zone"
      className={`ai-chat-wrapper ${isObsMode ? "obs-active" : ""}`}
    >
      <div className="chat-header-gift">
        <img
          src="https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1"
          alt="Gift"
          style={{ height: "20px" }}
        />
        <span style={{ color: "#bf94ff", fontWeight: "bold" }}>Anonymous</span>
        <span style={{ color: "#dedee3", marginLeft: "5px" }}>
          gifted 5 Subs!
        </span>
      </div>

      <div className="chat-messages-container" ref={chatContainerRef}>
        <div className="chat-stream-inner">
          {visibleMessages.length === 0 && !isStreaming && (
            <div
              className="welcome-message"
              style={{ textAlign: "center", marginTop: "50%" }}
            >
              Waiting for stream...
            </div>
          )}

          {visibleMessages.map((msg, idx) => {
            if (msg.isEvent) {
              return (
                <div
                  key={msg.uniqueId || idx}
                  className="chat-message-row event-notice"
                  style={{
                    background: "#1f1f23",
                    borderLeft: "4px solid #a970ff",
                    padding: "8px 10px",
                    margin: "4px 0",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    {msg.username}
                  </span>
                  <span style={{ color: "#a970ff" }}> {msg.systemText}</span>
                </div>
              );
            }
            return (
              <div className="live-message" key={msg.uniqueId || idx}>
                <span className="timestamp">{msg.timestamp}</span>

                <span className="badge-container">
                  {msg.badges?.map((b, i) => (
                    <img key={i} src={b} className="chat-badge" alt="" />
                  ))}
                </span>

                <span
                  className="chat-username"
                  style={{ color: msg.colorUsername }}
                >
                  {msg.username}
                </span>
                <span className="colon-separator">:</span>

                <span
                  className="chat-text"
                  dangerouslySetInnerHTML={{
                    __html: parseWithEmotes(msg.messageText),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "20px", borderTop: "1px solid #2f2f35" }}>
        <div
          style={{
            height: "40px",
            background: "#2f2f35",
            borderRadius: "4px",
            color: "#adadb8",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            fontSize: "0.9rem",
          }}
        >
          Send a message
        </div>
      </div>
    </div>
  );
};

export default ChatDisplay;
