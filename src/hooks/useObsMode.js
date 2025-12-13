import { useState } from "react";

export const useObsMode = () => {
  const [isObsMode, setIsObsMode] = useState(false);
  const [bgImage, setBgImage] = useState("/pepegif.gif");

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
