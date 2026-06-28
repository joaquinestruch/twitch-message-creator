import { useEffect, useRef } from 'react';

interface AdBannerProps {
  src: string;
}

export function AdBanner({ src }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = document.createElement('script');
    (s as unknown as Record<string, unknown>).settings = {};
    s.src = src;
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    el.appendChild(s);
    return () => { el.innerHTML = ''; };
  }, [src]);

  return <div ref={ref} />;
}

export { AdBanner as NativeAdBanner };
