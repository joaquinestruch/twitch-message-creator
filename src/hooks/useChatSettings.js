import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_BADGES = {
  subscriber: true,
  vip: true,
  moderator: false,
  verified: false,
  broadcaster: false,
  prime: false,
  turbo: false,
  artist: false,
  dj: false,
};

export const useChatSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Core Settings
  const [channelName, setChannelName] = useState(
    searchParams.get("channel") || "",
  );
  const [chatSpeed, setChatSpeed] = useState(
    Number(searchParams.get("speed")) || 500,
  );
  const [complexity, setComplexity] = useState(
    searchParams.get("complexity") || "simple",
  );
  const [language, setLanguage] = useState(searchParams.get("lang") || "en");
  const [messageCount, setMessageCount] = useState(30);

  // Badges
  const [enabledBadges, setEnabledBadges] = useState(DEFAULT_BADGES);

  // Sync to URL
  useEffect(() => {
    const params = {};
    if (channelName) params.channel = channelName;
    if (chatSpeed !== 500) params.speed = chatSpeed;
    if (complexity !== "simple") params.complexity = complexity;
    if (language !== "en") params.lang = language;

    setSearchParams(params, { replace: true });
  }, [channelName, chatSpeed, complexity, language, setSearchParams]);

  const toggleBadge = (id) => {
    setEnabledBadges((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return {
    channelName,
    setChannelName,
    chatSpeed,
    setChatSpeed,
    complexity,
    setComplexity,
    language,
    setLanguage,
    messageCount,
    setMessageCount,
    enabledBadges,
    toggleBadge,
  };
};
