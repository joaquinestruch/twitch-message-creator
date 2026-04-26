import { Link, useLocation } from 'react-router-dom';
import logoPepe from '@/assets/logo-pepe.png';
import { trackEvent } from '@/utils/analytics';

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

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <a
          href="https://ko-fi.com/N4N41PTRX2"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FF5E5B',
            color: '#fff',
            textDecoration: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          onClick={() => {
            trackEvent('click_support', 'Header', 'Ko-fi');
          }}
        >
          <img
            height="36"
            style={{
              border: '0px',
              height: '20px',
              verticalAlign: 'middle',
              marginRight: '8px',
            }}
            src="https://storage.ko-fi.com/cdn/cup-border.png"
            alt="Buy Me a Coffee at ko-fi.com"
          />
          Support me
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
