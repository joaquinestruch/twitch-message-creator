import '@/App.css';
import Header from '@/components/Header';
import Main from '@/components/Main';
import SEO from '@/components/SEO';
import { AdBanner, NativeAdBanner } from '@/components/AdBanner';

function HomeCreator(): JSX.Element {
  return (
    <>
      <SEO
        title="Twitch Chat Generator | Fake Message Creator"
        description="Create fake Twitch chat messages instantly with our free generator. Customize usernames, colors, badges, and emotes for memes, thumbnails, and videos."
        canonicalUrl="https://www.twitchmessagecreator.site/"
      />
      <Header />

      {/* A — 728x90 Leaderboard */}
      <div className="ad-leaderboard-wrap">
        <AdBanner size="728x90" />
      </div>

      <div className="page-layout">
        <aside className="ad-sidebar">
          <AdBanner size="160x600" />
        </aside>

        <div className="page-layout-center">
          <Main />
        </div>

        <aside className="ad-sidebar">
          <AdBanner size="160x300" />
        </aside>
      </div>

      {/* SEO Content */}
      <section className="seo-section">
        <h1 className="seo-title">Fake Twitch Chat Generator & Message Editor</h1>
        <p className="seo-text">
          Create <strong>fake Twitch chat messages</strong> instantly with our powerful editor.
          Perfect for making memes, editing videos, or pranking your friends. This{' '}
          <strong>Twitch Message Creator</strong> allows you to customize username, colors, badges
          (Mod, VIP, Prime, Sub), and emotes.
        </p>

        {/* D — Native Banner */}
        <div className="ad-native-wrap">
          <NativeAdBanner />
        </div>

        <div className="seo-grid">
          <div>
            <h2 className="seo-subtitle">How to Create Fake Stream Chats</h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li>
                <strong>Enter Details:</strong> Choose a username, write your message, and pick a color.
              </li>
              <li>
                <strong>Add Badges:</strong> Make it authentic with Moderator, Subscriber, or Verified badges.
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

      {/* E — 468x60 pre-footer */}
      <div className="ad-prefooter-wrap">
        <AdBanner size="468x60" />
      </div>
    </>
  );
}

export default HomeCreator;
