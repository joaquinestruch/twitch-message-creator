import Message from './message/Message';
import Nav from './nav/Nav';
import AdBanner from './AdBanner';

function Main() {
  return (
    <>
      <main className="container-main">
        <Nav />
        <Message />

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', width: '100%' }}>
          <div style={{ width: '46%', maxWidth: '340px' }}>
            <AdBanner
              adKey="22b9356eb2dd3193d628264ff2ae6d5c"
              network="effectivecpm"
              height={250}
            />
          </div>
          <div style={{ width: '46%', maxWidth: '340px' }}>
            <AdBanner
              adKey="22b9356eb2dd3193d628264ff2ae6d5c"
              network="effectivecpm"
              height={250}
            />
          </div>
        </div>

      </main>

      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default Main;
