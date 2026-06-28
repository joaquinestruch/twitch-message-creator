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
          adKey="22b9356eb2dd3193d628264ff2ae6d5c"
          network="effectivecpm"
          height={250}
        />

        <AdBanner
          adKey="22b9356eb2dd3193d628264ff2ae6d5c"
          network="effectivecpm"
          height={250}
        />

      </main>

      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default Main;
