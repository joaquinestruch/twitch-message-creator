interface AdBannerProps {
  adKey: string;
  format?: string;
  height?: number;
  width?: number;
  network?: 'highperformanceformat' | 'effectivecpm';
  className?: string;
}

// allow-top-navigation intentionally absent: prevents ad scripts from doing
// window.top.location = '...' (forced redirect of the parent page).
const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';

function AdBanner({ adKey, height, width, network = 'highperformanceformat', className }: AdBannerProps) {
  const h = height ?? 250;
  const w = width ?? 300;

  const src =
    network === 'effectivecpm'
      ? `/effectivecpm-loader.html?k=${adKey}`
      : `/ad-loader.html?k=${adKey}&h=${h}&w=${w}`;

  const iframeWidth = network === 'effectivecpm' ? '100%' : w;

  // Outer div carries only className (no display inline) so CSS display:none
  // on .ad-side-left/.ad-side-right is not overridden on mobile.
  // Inner div handles flex centering without affecting the outer class rules.
  return (
    <div className={className} style={{ overflow: 'hidden', minHeight: `${h}px` }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: `${h}px` }}>
        <iframe
          src={src}
          sandbox={SANDBOX}
          width={iframeWidth}
          height={h}
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
