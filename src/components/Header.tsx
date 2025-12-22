import { Link, useLocation } from 'react-router-dom';
import logoPepe from '@/assets/logo-pepe.png';

function Header(): JSX.Element {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="header-left">
        <h1 className="header-title">Twitch Message Creator</h1>

        <nav className="header-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Message Creator
          </Link>

          <span className="nav-separator" style={{ color: '#2f2f35' }}>
            |
          </span>

          <Link
            to="/ai-chat"
            className={`nav-link ${location.pathname.includes('ai') ? 'active' : ''}`}
          >
            AI Chat Simulator
          </Link>

          <span className="nav-separator" style={{ color: '#2f2f35' }}>
            |
          </span>

          <Link
            to="/animations"
            className={`nav-link ${location.pathname === '/animations' ? 'active' : ''}`}
          >
            Alert Animator
          </Link>
        </nav>
      </div>

      <div className="header-right">
        <a
          href="https://meritme.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="kick-button"
          style={{
            padding: '6px 12px',
            fontSize: '0.8rem',
            height: 'auto',
            transition: 'all 0.2s ease',
          }}
        >
          When the streamer dream ends, the resume begins ↗
        </a>
        <img
          src={logoPepe}
          alt="Twitch Message Creator Logo"
          style={{ height: '55px', borderRadius: '4px' }}
        />
      </div>
    </header>
  );
}

export default Header;
