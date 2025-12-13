import Message from './message/Message';
import Nav from './nav/Nav';

function Main() {
  return (
    <>
      <main className="container-main">
        <Nav />
        <Message />
      </main>
      <footer className="site-footer">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default Main;
