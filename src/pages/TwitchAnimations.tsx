import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "react-router-dom";

// Animation/Alert Generator Page
function TwitchAnimations(): JSX.Element {
  const [searchParams] = useSearchParams();

  // Init state from URL if present, else defaults
  const [amount, setAmount] = useState<string>(
    searchParams.get("amount") || "100",
  );
  const [username, setUsername] = useState<string>(
    searchParams.get("username") || "StreamerName",
  );
  const [message, setMessage] = useState<string>(
    searchParams.get("message") || "This is an awesome alert!",
  );
  const [bgColor, setBgColor] = useState<string>(
    searchParams.get("bgColor") || "#00ff00",
  );

  const isObsMode = searchParams.get("obs") === "true";

  useEffect(() => {
    document.title = "Twitch Bit Alert Generator - Animated OBS Overlay";
  }, []);

  // High Quality GIFs (Scale 4)
  const getBitGif = (amt: string): string => {
    const val = parseInt(amt);
    if (val >= 10000)
      return "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/10000/4.gif";
    if (val >= 5000)
      return "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/5000/4.gif";
    if (val >= 1000)
      return "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1000/4.gif";
    if (val >= 100)
      return "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/100/4.gif";
    return "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/4.gif";
  };

  const getBitColor = (amt: string): string => {
    const val = parseInt(amt);
    if (val >= 10000) return "#e005b9"; // Red
    if (val >= 5000) return "#0099fe"; // Blue
    if (val >= 1000) return "#1db954"; // Green
    if (val >= 100) return "#9c3ee8"; // Purple
    return "#979797"; // Gray
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("username", username);
    url.searchParams.set("amount", amount);
    url.searchParams.set("message", message);
    url.searchParams.set("bgColor", bgColor); // Persist user BG preference even in OBS
    url.searchParams.set("obs", "true");

    navigator.clipboard.writeText(url.toString());
    alert("Link Copied! Paste this into OBS Browser Source.");
  };

  // If OBS Mode, render ONLY the content
  if (isObsMode) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="alert-box-cheer"
          style={{ textAlign: "center", animation: "bounceIn 0.5s" }}
        >
          <img
            src={getBitGif(amount)}
            alt="bits"
            style={{
              width: "128px",
              height: "128px",
              marginBottom: "-20px",
              display: "block",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              color: "white",
              textShadow:
                "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              fontFamily: "Inter, sans-serif",
              marginTop: "10px",
            }}
          >
            {username}{" "}
            <span
              style={{ color: getBitColor(amount) }}
            >{`cheered ${amount}!`}</span>
          </div>
          <div
            style={{
              fontSize: "1.8rem",
              color: "white",
              marginTop: "10px",
              fontWeight: "600",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            "{message}"
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 60px)",
          background: "#0e0e10",
        }}
      >
        {/* Controls */}
        <div
          style={{
            width: "350px",
            padding: "20px",
            borderRight: "1px solid #2f2f35",
            background: "#18181b",
            color: "#fff",
          }}
        >
          <h2 style={{ color: "#a970ff" }}>💎 Bit Alert Creator</h2>

          <div className="control-group" style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#adadb8",
              }}
            >
              Bit Amount
              <select
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#2f2f35",
                  border: "none",
                  color: "white",
                  borderRadius: "4px",
                  marginTop: "5px",
                }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              >
                <option value="1">1 Bit (Gray)</option>
                <option value="100">100 Bits (Purple)</option>
                <option value="1000">1000 Bits (Green)</option>
                <option value="5000">5000 Bits (Blue)</option>
                <option value="10000">10000 Bits (Red)</option>
              </select>
            </label>
          </div>

          <div className="control-group" style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#adadb8",
              }}
            >
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#2f2f35",
                  border: "none",
                  color: "white",
                  borderRadius: "4px",
                  marginTop: "5px",
                }}
              />
            </label>
          </div>

          <div className="control-group" style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#adadb8",
              }}
            >
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#2f2f35",
                  border: "none",
                  color: "white",
                  borderRadius: "4px",
                  height: "60px",
                  resize: "none",
                  marginTop: "5px",
                }}
              />
            </label>
          </div>

          <div className="control-group" style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#adadb8",
              }}
            >
              Background (Green Screen)
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: "100%", height: "40px", cursor: "pointer", marginTop: "5px" }}
              />
            </label>
          </div>

          <button
            onClick={handleCopyLink}
            className="btn-primary"
            style={{
              width: "100%",
              fontSize: "1rem",
              marginBottom: "10px",
              background: "#9146ff",
            }}
          >
            🔗 Copy OBS Link
          </button>
          <p style={{ fontSize: "0.8rem", color: "#777", marginTop: "10px" }}>
            Paste the copied link into an OBS "Browser Source". The background
            will be transparent if you use the Chroma Key filter in OBS (or just
            Green Screen).
          </p>
        </div>

        {/* Preview Area */}
        <div
          style={{
            flex: 1,
            background: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div
              className="alert-box-cheer"
              style={{ animation: "bounceIn 0.5s" }}
            >
              <img
                src={getBitGif(amount)}
                alt="bits"
                style={{
                  width: "128px",
                  height: "128px",
                  marginBottom: "-20px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  color: "white",
                  textShadow:
                    "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                  fontFamily: "Inter, sans-serif",
                  marginTop: "10px",
                }}
              >
                {username}{" "}
                <span
                  style={{ color: getBitColor(amount) }}
                >{`cheered ${amount}!`}</span>
              </div>
              <div
                style={{
                  fontSize: "1.8rem",
                  color: "white",
                  marginTop: "10px",
                  fontWeight: "600",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                "{message}"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "0 20px",
          color: "#adadb8",
          fontFamily: "Inter, sans-serif",
          paddingBottom: "60px",
        }}
      >
        <h1
          style={{ color: "#a970ff", fontSize: "2rem", marginBottom: "20px" }}
        >
          Twitch Bit Alert Generator & Fake Stream Animations
        </h1>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          Create <strong>fake Twitch alerts</strong> and{" "}
          <strong>animated bit donations</strong> instantly. Whether you need a
          "Cheered 10000 bits" notification for a video edit or a{" "}
          <strong>transparent background alert</strong> for your OBS overlay,
          our <strong>Alert Animator</strong> delivers high-quality, authentic
          Twitch visuals.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          <div>
            <h3
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              💎 Realistic Bit Animations
            </h3>
            <p>
              We use the official animated gem assets (Gray, Purple, Green,
              Blue, Red) to ensure your alerts look exactly like the real thing.
              Perfect for simulating hype moments in your videos.
            </p>
          </div>
          <div>
            <h3
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              🎥 OBS Ready Source
            </h3>
            <p>
              Generate a unique <strong>Browser Source Link</strong> to add
              directly to OBS Studio. The alerts render at 60fps with full
              transparency support, no green screen removal required!
            </p>
          </div>
          <div>
            <h3
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              📸 High-Res Downloads
            </h3>
            <p>
              Need a thumbnail? Download a high-resolution PNG of the alert
              frame to use in your YouTube thumbnails or social media posts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TwitchAnimations;
