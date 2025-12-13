import React from 'react';

interface StreamPreviewProps {
  bgImage: string | null;
  setBgImage: (url: string | null) => void;
}

const StreamPreview: React.FC<StreamPreviewProps> = ({ bgImage, setBgImage }) => {
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
    }
  };

  return (
    <div
      className="video-placeholder"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'auto 60%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay Controls */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          display: 'flex',
          gap: '10px',
        }}
      >
        <label
          className="btn-secondary"
          style={{
            padding: '5px 10px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.6)',
          }}
        >
          📷 Change BG
          <input type="file" accept="image/*,video/*" hidden onChange={handleBgUpload} />
        </label>
        {bgImage && (
          <button
            onClick={() => setBgImage(null)}
            className="btn-secondary"
            style={{
              padding: '5px 10px',
              fontSize: '0.8rem',
              background: 'rgba(0,0,0,0.6)',
              color: '#ff4f4d',
            }}
          >
            ✕ Remove
          </button>
        )}
      </div>

      {!bgImage && (
        <div style={{ textAlign: 'center', opacity: 0.3 }}>
          <div style={{ fontSize: '4rem' }}>📹</div>
          <h2>Stream Preview</h2>
          <p>Live Chat Simulation</p>
        </div>
      )}
    </div>
  );
};

export default StreamPreview;
