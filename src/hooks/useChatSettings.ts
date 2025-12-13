import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BadgeMap } from "@/types";

const DEFAULT_BADGES: BadgeMap = {
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
  const [channelName, setChannelName] = useState<string>(
    searchParams.get("channel") || "",
  );
  const [chatSpeed, setChatSpeed] = useState<number>(
    Number(searchParams.get("speed")) || 500,
  );
  const [complexity, setComplexity] = useState<string>(
    searchParams.get("complexity") || "simple",
  );
  const [language, setLanguage] = useState<string>(
    searchParams.get("lang") || "en",
  );
  const [messageCount, setMessageCount] = useState<number>(30);

  // Badges
  const [enabledBadges, setEnabledBadges] = useState<BadgeMap>(DEFAULT_BADGES);

  // Sync to URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (channelName) params.channel = channelName;
    if (chatSpeed !== 500) params.speed = String(chatSpeed);
    if (complexity !== "simple") params.complexity = complexity;
    if (language !== "en") params.lang = language;

    setSearchParams(params, { replace: true });
  }, [channelName, chatSpeed, complexity, language, setSearchParams]);

  const toggleBadge = (id: string) => {
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
