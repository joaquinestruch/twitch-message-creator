import '@/App.css';
import Header from '@/components/Header';
import Main from '@/components/Main';
import SEO from '@/components/SEO';
import { AdBanner } from '@/components/AdBanner';

const AD1 = '//relieved-understanding.com/b.XGV-s/dgGFli0mYxW-ce/VeBmk9huNZvUWl/koPxTYcoxjNXzQYM4YONDDEdtJNczdES3QNsjqg_4/NXQF';
const AD2 = '//relieved-understanding.com/bdX.Vvscd/G/lY0/YrWJcM/KeBmF9fuaZ_U-lcksPKT/cXxVNszFcbxPNbDskLtCNBzeEV3jNGzUEq1/M-wB';
const AD3 = '//relieved-understanding.com/beXIVBs/d.Gyl/0rYiWzcm/Fe/mE9JuiZkURl/kUPHTKcPx/NSz/c/x/NNjpUAtVNKz_Ee3nNNzGEj2zOwQX';
const AD4 = '//relieved-understanding.com/b/X.V/sVdZGUlE0UYZWUcQ/ye/m/9CusZzUolakYPYTfcexrNAz/Y/4mOTToMGt_N/zbEy3-NBjbgp5fNZwL';

function HomeCreator(): JSX.Element {
  return (
    <>
      <SEO
        title="Twitch Chat Generator | Fake Message Creator"
        description="Create fake Twitch chat messages instantly with our free generator. Customize usernames, colors, badges, and emotes for memes, thumbnails, and videos."
        canonicalUrl="https://www.twitchmessagecreator.site/"
      />
      <Header />

      <div className="ad-leaderboard-wrap">
        <AdBanner src={AD1} />
      </div>

      <div className="page-layout">
        <aside className="ad-sidebar">
          <AdBanner src={AD2} />
        </aside>
        <div className="page-layout-center">
          <Main />
        </div>
        <aside className="ad-sidebar">
          <AdBanner src={AD3} />
        </aside>
      </div>

      <div className="ad-leaderboard-wrap">
        <AdBanner src={AD4} />
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

      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default HomeCreator;
