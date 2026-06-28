import { useEffect, useRef } from 'react';

interface AdContainerBannerProps {
  containerId: string;
  scriptSrc: string;
}

function AdContainerBanner({ containerId, scriptSrc }: AdContainerBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Evita popunders al tocar botones/enlaces en móvil
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.setAttribute('data-cfasync', 'false');
    container.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [containerId, scriptSrc]);

  return (
    <div
      ref={containerRef}
      id={containerId}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '16px 0',
      }}
    />
  );
}

export default AdContainerBanner;
