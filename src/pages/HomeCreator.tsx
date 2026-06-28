import '@/App.css';
import Header from '@/components/Header';
import Main from '@/components/Main';
import SEO from '@/components/SEO';
import AdBanner from '@/components/AdBanner';

function HomeCreator(): JSX.Element {
  return (
    <>
      <SEO
        title="Twitch Chat Generator | Fake Message Creator"
        description="Create fake Twitch chat messages instantly with our free generator. Customize usernames, colors, badges, and emotes for memes, thumbnails, and videos."
        canonicalUrl="https://www.twitchmessagecreator.site/"
      />
      <Header />

      {/* Leaderboard top */}
      <div className="ad-top">
        <AdBanner
          adKey="7b6b0557815796b9a0463495207a9fa7"
          network="highperformanceformat"
          height={90}
          width={728}
        />
      </div>

      {/* Side ads + content */}
      <div className="ad-page-layout">
        <div className="ad-side-left">
          <AdBanner adKey="db589995e674f18306ba71a948ad2e7c" network="highperformanceformat" height={600} width={160} />
        </div>

        <div className="ad-center-content">
          <Main />
        </div>

        <div className="ad-side-right">
          <AdBanner adKey="9f4efef015cafc796bf969fdfc8d2cc5" network="highperformanceformat" height={300} width={160} />
        </div>
      </div>

      {/* Bottom */}
      <AdBanner
        adKey="b8cf93107d603df2727232c920686599"
        network="highperformanceformat"
        height={60}
        width={468}
        className="ad-bottom"
      />

      {/* SEO Content */}
      <section className="seo-section">
        <h1 className="seo-title">Fake Twitch Chat Generator & Message Editor</h1>
        <p className="seo-text">
          Create <strong>fake Twitch chat messages</strong> instantly with our powerful editor.
          Perfect for making memes, editing videos, or pranking your friends. This{' '}
          <strong>Twitch Message Creator</strong> allows you to customize username, colors, badges
          (Mod, VIP, Prime, Sub), and emotes.
        </p>

        <div className="seo-grid">
          <div>
            <h2 className="seo-subtitle">How to Create Fake Stream Chats</h2>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '20px',
                marginTop: '10px',
              }}
            >
              <li>
                <strong>Enter Details:</strong> Choose a username, write your message, and pick a
                color.
              </li>
              <li>
                <strong>Add Badges:</strong> Make it authentic with Moderator, Subscriber, or
                Verified badges.
              </li>
              <li>
                <strong>Download Image:</strong> Capture the result as a high-quality PNG.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="seo-subtitle">Why use this tool?</h2>
            <p>
              From YouTubers editing content to streamers making thumbnails, our{' '}
              <strong>Fake Twitch Chat Generator</strong>
              provides the most realistic simulation available. No login required, highly
              customizable, and completely free.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeCreator;
