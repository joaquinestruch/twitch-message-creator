import { useState } from 'react';

export const useObsMode = () => {
  const [isObsMode, setIsObsMode] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string | null>('/pepegif.gif');

  const toggleObsMode = () => {
    setIsObsMode((prev) => !prev);
  };

  return {
    isObsMode,
    toggleObsMode,
    bgImage,
    setBgImage,
  };
};
