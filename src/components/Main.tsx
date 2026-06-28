import Message from './message/Message';
import Nav from './nav/Nav';
import { AdBanner } from './AdBanner';

function Main() {
  return (
    <>
      <main className="container-main">
        <Nav />
        <Message />
      </main>

      <div className="ad-rectangle-wrap">
        <AdBanner size="300x250" />
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>

      <div className="ad-mobile-sticky">
        <AdBanner size="320x50" />
      </div>
    </>
  );
}

export default Main;
