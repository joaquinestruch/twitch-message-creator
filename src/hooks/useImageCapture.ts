import { useState } from 'react';
import { toPng } from 'html-to-image';

interface UseImageCaptureOptions {
  fileName?: string;
}

// The browser canvas supports oklch natively — use it to convert to rgba
function toRgba(color: string): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return a === 0 ? 'rgba(0,0,0,0)' : `rgba(${r},${g},${b},${(a / 255).toFixed(3)})`;
  } catch {
    return 'transparent';
  }
}

const COLOR_PROPS = [
  'color',
  'background-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'text-decoration-color',
  'caret-color',
];

// Temporarily replace oklch values with rgb equivalents so html-to-image can parse them
function patchOklch(root: HTMLElement): () => void {
  const all = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];
  const cleanups: (() => void)[] = [];

  all.forEach((el) => {
    const cs = window.getComputedStyle(el);
    COLOR_PROPS.forEach((prop) => {
      const val = cs.getPropertyValue(prop);
      if (!val || !val.includes('oklch')) return;
      const prev = el.style.getPropertyValue(prop);
      const prevPriority = el.style.getPropertyPriority(prop);
      el.style.setProperty(prop, toRgba(val), 'important');
      cleanups.push(() => {
        el.style.removeProperty(prop);
        if (prev) el.style.setProperty(prop, prev, prevPriority);
      });
    });
  });

  return () => cleanups.forEach((c) => c());
}

export const useImageCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  const captureElement = async (
    selectorOrElement: string | HTMLElement,
    options: UseImageCaptureOptions = {}
  ) => {
    setIsCapturing(true);
    try {
      const element =
        typeof selectorOrElement === 'string'
          ? (document.querySelector(selectorOrElement) as HTMLElement)
          : selectorOrElement;

      if (!element) return;

      // Remove overflow clipping so html-to-image captures the full content
      const prevOverflow = element.style.overflow;
      const prevWhiteSpace = element.style.whiteSpace;
      element.style.overflow = 'visible';
      element.style.whiteSpace = 'nowrap';
      const fullWidth = element.scrollWidth;
      const fullHeight = element.scrollHeight;

      const restore = patchOklch(element);
      let dataUrl: string;
      try {
        dataUrl = await toPng(element, {
          backgroundColor: 'transparent',
          pixelRatio: 2,
          width: fullWidth,
          height: fullHeight,
        });
      } finally {
        restore();
        element.style.overflow = prevOverflow;
        element.style.whiteSpace = prevWhiteSpace;
      }

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = options.fileName || 'capture.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing image:', error);
      alert('Could not capture image. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  return { captureElement, isCapturing };
};
