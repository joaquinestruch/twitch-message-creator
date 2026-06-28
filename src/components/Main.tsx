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
          format="iframe"
          height={250}
          width={300}
        />

        <AdBanner
          adKey="b8cf93107d603df2727232c920686599"
          format="iframe"
          height={60}
          width={468}
        />

      </main>

      <footer className="site-footer">
        <AdBanner
          adKey="90024b897148298cd3785fe151ea9109"
          format="iframe"
          height={50}
          width={320}
        />
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default Main;
