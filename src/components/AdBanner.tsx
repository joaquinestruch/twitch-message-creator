import { useEffect, useRef } from 'react';

const CONFIGS = {
  '728x90':  { key: '7b6b0557815796b9a0463495207a9fa7', w: 728, h: 90  },
  '468x60':  { key: 'b8cf93107d603df2727232c920686599', w: 468, h: 60  },
  '320x50':  { key: '90024b897148298cd3785fe151ea9109', w: 320, h: 50  },
  '300x250': { key: '67814030039a58aa0669864c58376dfc', w: 300, h: 250 },
  '160x600': { key: 'db589995e674f18306ba71a948ad2e7c', w: 160, h: 600 },
  '160x300': { key: '9f4efef015cafc796bf969fdfc8d2cc5', w: 160, h: 300 },
} as const;

type AdSize = keyof typeof CONFIGS;

export function AdBanner({ size }: { size: AdSize }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { key, w, h } = CONFIGS[size];

    const opts = document.createElement('script');
    opts.text = `atOptions={'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};`;
    el.appendChild(opts);

    const invoke = document.createElement('script');
    invoke.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    el.appendChild(invoke);

    return () => { el.innerHTML = ''; };
  }, [size]);

  return <div ref={ref} />;
}

export function NativeAdBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const containerId = '22b9356eb2dd3193d628264ff2ae6d5c';
    const div = document.createElement('div');
    div.id = containerId;
    el.appendChild(div);

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29893446.effectivecpmnetwork.com/22b9356eb2dd3193d628264ff2ae6d5c/invoke.js';
    el.appendChild(script);

    return () => { el.innerHTML = ''; };
  }, []);

  return <div ref={ref} />;
}
