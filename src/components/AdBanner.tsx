import { useEffect } from 'react';

interface AdBannerProps {
  adKey: string;
  format: string;
  height: number;
  width: number;
  className?: string;
}

function AdBanner({ adKey, format, height, width, className }: AdBannerProps) {
  useEffect(() => {
    // Inline script sets atOptions immediately before invoke.js loads
    const inline = document.createElement('script');
    inline.textContent = `
      window.atOptions = {
        key: '${adKey}',
        format: '${format}',
        height: ${height},
        width: ${width},
        params: {}
      };
    `;
    document.body.appendChild(inline);

    const invoke = document.createElement('script');
    invoke.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    document.body.appendChild(invoke);

    return () => {
      if (inline.parentNode) inline.parentNode.removeChild(inline);
      if (invoke.parentNode) invoke.parentNode.removeChild(invoke);
    };
  }, [adKey, format, height, width]);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '16px 0',
        minHeight: height,
      }}
    />
  );
}

export default AdBanner;
