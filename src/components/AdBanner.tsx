import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  adKey: string;
  height?: number;
  width?: number;
  network?: 'highperformanceformat' | 'effectivecpm';
  className?: string;
}

const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation';
const FALLBACK_KEY = '22b9356eb2dd3193d628264ff2ae6d5c';

let idCounter = 0;

function AdBanner({ adKey, height, width, network = 'highperformanceformat', className }: AdBannerProps) {
  const h = height ?? 250;
  const w = width ?? 300;
  const instanceId = useRef(`ad-${++idCounter}`).current;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (network !== 'highperformanceformat') return;

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.adInstanceId === instanceId && e.data?.type === 'ad-failed') {
        setFailed(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [instanceId, network]);

  const currentNetwork = failed ? 'effectivecpm' : network;
  const currentKey = failed ? FALLBACK_KEY : adKey;
  const currentH = failed ? 250 : h;

  const src =
    currentNetwork === 'effectivecpm'
      ? `/effectivecpm-loader.html?k=${currentKey}`
      : `/ad-loader.html?k=${currentKey}&h=${h}&w=${w}&id=${instanceId}`;

  const iframeWidth = currentNetwork === 'effectivecpm' ? '100%' : w;

  // Outer div carries only className (no display inline) so CSS display:none
  // on .ad-side-left/.ad-side-right is not overridden on mobile.
  // Inner div handles flex centering without affecting the outer class rules.
  return (
    <div className={className} style={{ overflow: 'hidden', minHeight: `${currentH}px` }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: `${currentH}px` }}>
        <iframe
          key={failed ? 'fallback' : 'primary'}
          src={src}
          sandbox={SANDBOX}
          width={iframeWidth}
          height={currentH}
          scrolling="no"
          frameBorder="0"
          style={{ border: 'none', display: 'block', flexShrink: 0 }}
          title="ad"
        />
      </div>
    </div>
  );
}

export default AdBanner;
