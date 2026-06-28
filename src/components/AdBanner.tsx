interface AdBannerProps {
  adKey: string;
  format?: string;
  height?: number;
  width?: number;
  network?: 'highperformanceformat' | 'effectivecpm';
  className?: string;
}

// sandbox without allow-same-origin + allow-top-navigation → ad scripts cannot
// redirect window.top, and cannot remove the sandbox attribute themselves.
// allow-popups lets click-through ads open a new tab normally.
// allow-same-origin: scripts need their real origin to make ad network requests.
// allow-top-navigation is intentionally ABSENT: prevents any script inside from
// doing window.top.location = '...' (forced redirect of the parent page).
const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';

function AdBanner({ adKey, height, width, network = 'highperformanceformat', className }: AdBannerProps) {
  const h = height ?? 250;
  const w = width ?? 300;

  const src =
    network === 'effectivecpm'
      ? `/effectivecpm-loader.html?k=${adKey}`
      : `/ad-loader.html?k=${adKey}&h=${h}&w=${w}`;

  const iframeWidth = network === 'effectivecpm' ? '100%' : w;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        minHeight: `${h}px`,
      }}
    >
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
  );
}

export default AdBanner;
