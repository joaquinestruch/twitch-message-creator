import { useEffect } from "react";
import "@/App.css";
import Header from "@/components/Header";
import Main from "@/components/Main";

function HomeCreator(): JSX.Element {
  useEffect(() => {
    document.title = "Fake Twitch Chat Generator - Free Message Editor";
  }, []);

  return (
    <>
      <Header />
      <Main />

      {/* SEO Content */}
      <section className="seo-section">
        <h1 className="seo-title">
          Fake Twitch Chat Generator & Message Editor
        </h1>
        <p className="seo-text">
          Create <strong>fake Twitch chat messages</strong> instantly with our
          powerful editor. Perfect for making memes, editing videos, or pranking
          your friends. This <strong>Twitch Message Creator</strong> allows you
          to customize username, colors, badges (Mod, VIP, Prime, Sub), and
          emotes.
        </p>

        <div className="seo-grid">
          <div>
            <h2 className="seo-subtitle">
              How to Create Fake Stream Chats
            </h2>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "20px",
                marginTop: "10px",
              }}
            >
              <li>
                <strong>Enter Details:</strong> Choose a username, write your
                message, and pick a color.
              </li>
              <li>
                <strong>Add Badges:</strong> Make it authentic with Moderator,
                Subscriber, or Verified badges.
              </li>
              <li>
                <strong>Download Image:</strong> Capture the result as a
                high-quality PNG.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="seo-subtitle">
              Why use this tool?
            </h2>
            <p>
              From YouTubers editing content to streamers making thumbnails, our{" "}
              <strong>Fake Twitch Chat Generator</strong>
              provides the most realistic simulation available. No login
              required, highly customizable, and completely free.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeCreator;
