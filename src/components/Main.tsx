import Message from './message/Message';
import Nav from './nav/Nav';
import AdBanner from './AdBanner';

function Main() {
  return (
    <>
      <main className="container-main">
        <Nav />
        <Message />

        <AdBanner
          adKey="67814030039a58aa0669864c58376dfc"
          network="highperformanceformat"
          height={250}
          width={300}
        />

        <div className="ad-mobile-only">
          <AdBanner
            adKey="90024b897148298cd3785fe151ea9109"
            network="highperformanceformat"
            height={50}
            width={320}
          />
        </div>

      </main>

      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default Main;
