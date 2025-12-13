import React from "react";

const BADGES = [
  { id: "broadcaster", label: "Broadcaster" },
  { id: "moderator", label: "Moderator" },
  { id: "verified", label: "Verified" },
  { id: "vip", label: "VIP" },
  { id: "artist", label: "Artist" },
  { id: "dj", label: "DJ" },
  { id: "subscriber", label: "Subscriber" },
  { id: "prime", label: "Prime" },
  { id: "turbo", label: "Turbo" },
];

import { ChatMessage, BadgeMap } from "../types";

// We can define subtypes for Props based on hooks return values structure
interface ControlPanelProps {
  mode: string;
  setMode: (mode: string) => void;
  settings: {
    channelName: string;
    setChannelName: (v: string) => void;
    messageCount: number;
    setMessageCount: (v: number) => void;
    language: string;
    setLanguage: (v: string) => void;
    complexity: string;
    setComplexity: (v: string) => void;
    chatSpeed: number;
    setChatSpeed: (v: number) => void;
    enabledBadges: BadgeMap;
    toggleBadge: (id: string) => void;
  };
  manual: {
    manualUsername: string;
    setManualUsername: (v: string) => void;
    manualMessage: string;
    setManualMessage: (v: string) => void;
    manualColor: string;
    setManualColor: (v: string) => void;
    manualBadges: Record<string, boolean>;
    setManualBadges: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
    handleAddManualMessage: () => void;
  };
  handlers: {
    handleGenerate: () => void;
    handleApplyPreset: (type: string) => void;
    handleTriggerEvent: (type: "sub" | "gift" | "cheer" | "donation") => void;
    toggleStream: () => void;
    handleDownload: () => void;
    toggleObsMode: () => void;
    clearMessages: () => void;
  };
  status: {
    isLoading: boolean;
    isStreaming: boolean;
    messagePool: ChatMessage[];
  };
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  setMode,
  settings,
  manual,
  handlers,
  status,
}) => {
  // Destructure for easier access
  const {
    channelName,
    setChannelName,
    messageCount,
    setMessageCount,
    language,
    setLanguage,
    complexity,
    setComplexity,
    chatSpeed,
    setChatSpeed,
    enabledBadges,
    toggleBadge,
  } = settings;

  const {
    manualUsername,
    setManualUsername,
    manualMessage,
    setManualMessage,
    manualColor,
    setManualColor,
    manualBadges,
    setManualBadges,
    handleAddManualMessage,
  } = manual;

  const {
    handleGenerate,
    handleApplyPreset,
    handleTriggerEvent,
    toggleStream,
    handleDownload,
    toggleObsMode,
    clearMessages,
  } = handlers;

  const { isLoading, isStreaming, messagePool } = status;

  return (
    <div className="controls-dashboard">
      {/* Mode Toggle Tabs */}
      <div className="mode-tabs">
        <button
          className={`mode-tab-btn ${mode === "ai" ? "active" : ""}`}
          onClick={() => setMode("ai")}
        >
          🤖 AI Generator
        </button>
        <button
          className={`mode-tab-btn ${mode === "manual" ? "active" : ""}`}
          onClick={() => setMode("manual")}
        >
          ✍️ Manual Creator
        </button>
      </div>

      {/* AI MODE CONTROLS */}
      {mode === "ai" && (
        <div className="controls-grid">
          <div className="control-group">
            <label className="control-label">Channel Name</label>
            <input
              type="text"
              className="custom-input"
              placeholder="e.g. xQc"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label className="control-label">
              Message Count: {messageCount}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              className="custom-slider"
              value={messageCount}
              onChange={(e) => setMessageCount(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Language</label>
            <select
              className="custom-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="es">Español (ES/LATAM)</option>
              <option value="en">English (US/Global)</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Complexity</label>
            <select
              className="custom-input"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
            >
              <option value="simple">Short / Spammy</option>
              <option value="mixed">Mixed</option>
              <option value="complex">Long / Chatty</option>
            </select>
          </div>

          {/* Scenario Presets Row */}
          <div className="control-group" style={{ gridColumn: "1 / -1" }}>
            <label className="control-label" style={{ color: "#00db84" }}>
              ⚡ Quick Scenarios (Viral)
            </label>
            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button
                onClick={() => handleApplyPreset("jumpscare")}
                className="btn-secondary"
                style={{
                  fontSize: "0.8rem",
                  padding: "6px 10px",
                  background: "#3a3a3d",
                }}
              >
                😱 Jumpscare
              </button>
              <button
                onClick={() => handleApplyPreset("hype")}
                className="btn-secondary"
                style={{
                  fontSize: "0.8rem",
                  padding: "6px 10px",
                  background: "#3a3a3d",
                }}
              >
                🎉 Hype Train
              </button>
              <button
                onClick={() => handleApplyPreset("toxic")}
                className="btn-secondary"
                style={{
                  fontSize: "0.8rem",
                  padding: "6px 10px",
                  background: "#3a3a3d",
                }}
              >
                💀 Toxic/Roast
              </button>
            </div>
          </div>

          <div className="control-group" style={{ gridColumn: "1 / -1" }}>
            <label className="control-label">Allowed Badges (AI)</label>
            <div className="badge-selector-group">
              {BADGES.map((badge) => (
                <label
                  key={badge.id}
                  className={`badge-toggle-btn ${enabledBadges[badge.id] ? "active" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={enabledBadges[badge.id]}
                    onChange={() => toggleBadge(badge.id)}
                  />
                  {badge.label}
                </label>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Speed: {chatSpeed}ms</label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              className="custom-slider"
              value={chatSpeed}
              onChange={(e) => setChatSpeed(Number(e.target.value))}
              style={{ direction: "rtl" }}
            />
          </div>
        </div>
      )}

      {/* MANUAL MODE CONTROLS */}
      {mode === "manual" && (
        <div className="controls-grid">
          <div className="manual-grid-row" style={{ gridColumn: "1 / -1" }}>
            <div className="control-group" style={{ flex: 1 }}>
              <label className="control-label">Username</label>
              <input
                type="text"
                className="custom-input"
                value={manualUsername}
                onChange={(e) => setManualUsername(e.target.value)}
              />
            </div>
            <div className="control-group">
              <label className="control-label">Color</label>
              <input
                type="color"
                className="manual-color-picker"
                value={manualColor}
                onChange={(e) => setManualColor(e.target.value)}
              />
            </div>
          </div>

          <div className="control-group" style={{ gridColumn: "1 / -1" }}>
            <label className="control-label">Message</label>
            <textarea
              className="custom-input"
              rows={2}
              value={manualMessage}
              onChange={(e) => setManualMessage(e.target.value)}
              placeholder="Type a message (Kappa supported)..."
              style={{ resize: "none", height: "60px" }}
            ></textarea>
          </div>

          <div className="control-group" style={{ gridColumn: "1 / -1" }}>
            <label className="control-label">Stream Events (Fake)</label>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleTriggerEvent("sub")}
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "5px", flex: "1" }}
              >
                ⭐ New Sub
              </button>
              <button
                onClick={() => handleTriggerEvent("gift")}
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "5px", flex: "1" }}
              >
                🎁 Gift 5
              </button>
              <button
                onClick={() => handleTriggerEvent("cheer")}
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "5px", flex: "1" }}
              >
                💎 100 Bits
              </button>
              <button
                onClick={() => handleTriggerEvent("donation")}
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "5px", flex: "1" }}
              >
                💸 Donate $10
              </button>
            </div>
          </div>

          <div className="control-group" style={{ gridColumn: "1 / -1" }}>
            <label className="control-label">Badges</label>
            <div className="badge-selector-group">
              {[
                "subscriber",
                "moderator",
                "verified",
                "vip",
                "broadcaster",
                "prime",
              ].map((bid) => (
                <label
                  key={bid}
                  className={`badge-toggle-btn ${manualBadges[bid] ? "active" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={manualBadges[bid]}
                    onChange={() =>
                      setManualBadges((p) => ({ ...p, [bid]: !p[bid] }))
                    }
                  />
                  {bid.charAt(0).toUpperCase() + bid.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="manual-actions">
        {mode === "ai" ? (
          <>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? "Generating..." : "Generate New Chat"}
            </button>
            {messagePool.length > 0 && (
              <button
                onClick={toggleStream}
                className="btn-secondary"
                style={{ background: isStreaming ? "#ff4f4d" : "#2f2f35" }}
              >
                {isStreaming ? "⏹ Stop Stream" : "▶ Start Stream"}
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleAddManualMessage}
              className="btn-primary"
              style={{ background: "#00db84", color: "#000" }}
            >
              + Add Message
            </button>
            <button onClick={clearMessages} className="btn-secondary">
              Clear Chat
            </button>
          </>
        )}

        <button
          onClick={handleDownload}
          className="btn-secondary"
          style={{
            width: "auto",
            background: "#2f2f35",
            border: "1px solid #4f4f56",
          }}
          title="Save Image"
        >
          📸 Save
        </button>
        <button
          onClick={toggleObsMode}
          className="toggle-obs-btn"
          style={{ width: "auto" }}
        >
          Pop-out ↗
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
