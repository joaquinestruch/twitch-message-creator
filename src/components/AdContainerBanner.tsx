import { useEffect, useRef } from 'react';

interface AdContainerBannerProps {
  containerId: string;
  scriptSrc: string;
}

function AdContainerBanner({ containerId, scriptSrc }: AdContainerBannerProps) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [containerId, scriptSrc]);

  return (
    <div
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
