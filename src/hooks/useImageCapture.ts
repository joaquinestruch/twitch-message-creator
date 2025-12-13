import { useState } from 'react';
import html2canvas from 'html2canvas';

interface UseImageCaptureOptions {
  fileName?: string;
}

export const useImageCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  const captureElement = async (
    selectorOrElement: string | HTMLElement,
    options: UseImageCaptureOptions = {}
  ) => {
    setIsCapturing(true);
    try {
      let element: HTMLElement | null = null;

      if (typeof selectorOrElement === 'string') {
        element = document.querySelector(selectorOrElement) as HTMLElement;
      } else {
        element = selectorOrElement;
      }

      if (!element) {
        console.error('Element to capture not found');
        return;
      }

      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = options.fileName || 'capture.png';
      link.click();
    } catch (error) {
      console.error('Error capturing image:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  return { captureElement, isCapturing };
};
