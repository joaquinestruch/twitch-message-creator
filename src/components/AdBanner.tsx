import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  format: string;
  height: number;
  width: number;
  className?: string;
}

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

function AdBanner({ adKey, format, height, width, className }: AdBannerProps) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    window.atOptions = {
      key: adKey,
      format,
      height,
      width,
      params: {},
    };

    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
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
