import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import "@/App.css";
import "./AiChat.css";
import html2canvas from "html2canvas";

// Hooks
import { useChatSettings } from "@/hooks/useChatSettings";
import { useChatGenerator } from "@/hooks/useChatGenerator";
import { useStreamEvents } from "@/hooks/useStreamEvents";
import { useObsMode } from "@/hooks/useObsMode";
import { useManualMode } from "@/hooks/useManualMode";

// Components
import StreamPreview from "@/components/StreamPreview";
import ControlPanel from "@/components/ControlPanel";
import ChatDisplay from "@/components/ChatDisplay";

function AiChatGenerator() {
  // Hooks Integration
  const settings = useChatSettings();
  const obs = useObsMode();

  const chatGen = useChatGenerator(settings, settings.enabledBadges);
  const manual = useManualMode(chatGen.addMessage);
  const events = useStreamEvents(chatGen.addMessage, manual.manualUsername);

  const [mode, setMode] = useState<string>("ai");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // SEO & Metadata
  useEffect(() => {
    document.title = "Twitch Chat Simulator | AI Fake Stream Generator";
    // ... (Existing SEO logic could be moved to a useSEO hook but for now keeping it simple)
  }, []);

  // Scroll to bottom effect
  useEffect(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
    }
  }, [chatGen.visibleMessages]);

  const handleDownload = () => {
    const element = document.getElementById("ai-capture-zone");
    if (!element) return;

    html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `chat_${settings.channelName}_live.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <>
      {!obs.isObsMode && <Header />}
      
      <main className={`ai-chat-main ${obs.isObsMode ? "obs-active" : ""}`}>
        {/* LEFT SIDE */}
        <section className="stream-layout-left">

          <StreamPreview bgImage={obs.bgImage} setBgImage={obs.setBgImage} />

          {!obs.isObsMode && (
            <ControlPanel
              mode={mode}
              setMode={setMode}
              settings={settings}
              manual={manual}
              handlers={{
                handleGenerate: () => chatGen.generateChat(null),
                handleApplyPreset: (type: string) => chatGen.generateChat(type),
                handleTriggerEvent: events.triggerEvent,
                toggleStream: chatGen.toggleStream,
                handleDownload,
                toggleObsMode: obs.toggleObsMode,
                clearMessages: chatGen.clearMessages,
              }}
              status={{
                isLoading: chatGen.isLoading,
                isStreaming: chatGen.isStreaming,
                messagePool: chatGen.messagePool,
              }}
            />
          )}
        </section>

        {/* RIGHT SIDE */}
        <ChatDisplay
          visibleMessages={chatGen.visibleMessages}
          chatContainerRef={chatContainerRef}
          isObsMode={obs.isObsMode}
          isStreaming={chatGen.isStreaming}
        />

        {obs.isObsMode && (
          <button
            onClick={obs.toggleObsMode}
            style={{
              position: "fixed",
              top: "10px",
              left: "10px",
              opacity: 0.1,
              zIndex: 9999,
              background: "red",
              border: "none",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.opacity = "1")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.opacity = "0.1")
            }
          >
            EXIT OBS MODE
          </button>
        )}
      </main>

      {/* SEO Content Section */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          color: "#adadb8",
          fontSize: "0.9rem",
          lineHeight: "1.6",
        }}
      >
        <h2
          style={{ color: "#a970ff", fontSize: "1.5rem", marginBottom: "10px" }}
        >
          About Twitch Chat Simulator
        </h2>
        <p>
          Welcome to the most realistic <strong>Twitch Chat Simulator</strong>{" "}
          and <strong>Fake Chat Generator</strong>. Whether you are a streamer
          looking for a fake chat overlay for OBS, a video editor needing
          authentic chat logs for content, or just want to prank your friends,
          our AI-powered tool generates high-quality, realistic Twitch messages
          instantly.
        </p>
      </section>
    </>
  );
}

export default AiChatGenerator;
