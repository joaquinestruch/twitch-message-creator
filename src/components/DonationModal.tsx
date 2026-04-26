import React from 'react';
import { useDonationStore } from '../store/useDonationStore';
import { trackEvent } from '../utils/analytics';

const DonationModal: React.FC = () => {
  const { isModalOpen, modalReason, closeModal } = useDonationStore();

  if (!isModalOpen) return null;

  const handleSupportClick = () => {
    trackEvent('click_support', 'DonationModal', modalReason || 'unknown');
    closeModal();
  };

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        backdropFilter: 'blur(3px)',
      }}
      onClick={closeModal}
      onKeyDown={(e) => {
        if (e.key === 'Escape') closeModal();
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          background: '#18181b',
          border: '1px solid #2f2f35',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '450px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
          color: '#fff',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: '#00db84' }}>
          {modalReason === 'download' ? 'Image Saved! 📸' : 'Welcome back! 👋'}
        </h2>
        
        <p style={{ color: '#adadb8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px' }}>
          {modalReason === 'download' 
            ? 'I see the tool has been useful for you. I run this entirely on my own and it costs money to keep it online. If it saved you some time, would you consider buying me a coffee to keep it 100% free and ad-free?'
            : 'I see you\'re getting a lot of use out of the tool! Keeping the servers running costs me money every month. If you can support the project with a coffee, it would be an incredible help!'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href="https://ko-fi.com/N4N41PTRX2"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSupportClick}
            style={{
              backgroundColor: '#FF5E5B',
              color: '#fff',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <img
              style={{ height: '24px', marginRight: '10px' }}
              src="https://storage.ko-fi.com/cdn/cup-border.png"
              alt="Ko-fi cup"
            />
            Buy me a coffee ☕
          </a>
          
          <button
            onClick={closeModal}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#adadb8',
              cursor: 'pointer',
              padding: '8px',
              fontSize: '0.9rem',
              textDecoration: 'underline',
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
