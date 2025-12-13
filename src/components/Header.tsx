import { Link, useLocation } from "react-router-dom";

function Header(): JSX.Element {
  const location = useLocation();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#18181b",
        borderBottom: "1px solid #000",
        height: "60px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h1 style={{ fontSize: "1.2rem", margin: 0, color: "white" }}>
          Twitch Message Creator
        </h1>

        <nav style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/"
            style={{
              color: location.pathname === "/" ? "#a970ff" : "#efeff1",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            Message Creator
          </Link>

          <span style={{ color: "#2f2f35" }}>|</span>

          <Link
            to="/ai-chat"
            style={{
              color: location.pathname.includes("ai") ? "#a970ff" : "#efeff1",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            AI Chat Simulator
          </Link>

          <span style={{ color: "#2f2f35" }}>|</span>

          <Link
            to="/animations"
            style={{
              color:
                location.pathname === "/animations" ? "#a970ff" : "#efeff1",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            Alert Animator
          </Link>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <a
          href="https://kick-message-creator.vercel.app/"
          target="_blank"
          className="kick-button"
          style={{
            padding: "6px 12px",
            fontSize: "0.8rem",
            height: "auto",
          }}
        >
          Kick Generator ↗
        </a>
        <img
          src="https://blog.cdn.own3d.tv/resize=fit:crop,height:400,width:600/LpfvrIJwRweax4SlbXKq"
          alt=""
          style={{ height: "30px", borderRadius: "4px" }}
        />
      </div>
    </header>
  );
}

export default Header;
