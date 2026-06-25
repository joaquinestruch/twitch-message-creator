import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  format: string;
  height: number;
  width: number;
  className?: string;
}

function AdBanner({ adKey, format, height, width, className }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
    container.appendChild(inline);

    const invoke = document.createElement('script');
    invoke.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    container.appendChild(invoke);

    return () => {
      if (inline.parentNode) inline.parentNode.removeChild(inline);
      if (invoke.parentNode) invoke.parentNode.removeChild(invoke);
    };
  }, [adKey, format, height, width]);

  return (
    <div
      ref={containerRef}
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
