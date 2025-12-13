import { useState, useRef, useEffect, useCallback } from "react";
import { generateChatStream } from "../services/api";
import { BADGE_ASSETS, EMOTES } from "../utils/embleds";
import { colorsName } from "../utils/colorsName";
import { ChatSettings, BadgeMap, ChatMessage } from "../types";

export const useChatGenerator = (
  settings: ChatSettings,
  enabledBadges: BadgeMap,
) => {
  const [messagePool, setMessagePool] = useState<ChatMessage[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const poolIndexRef = useRef<number>(0);

  const generateChat = async (scenarioType: string | null = null) => {
    setIsLoading(true);
    setIsStreaming(false);
    setError(null);
    setVisibleMessages([]);
    poolIndexRef.current = 0;

    try {
      const availableEmotes = Object.keys(EMOTES).join(", ");

      const rawMessages = await generateChatStream({
        ...settings,
        scenarioType,
        availableEmotes,
      });

      const processed: ChatMessage[] = rawMessages.map((msg) => {
        const badges: string[] = [];
        // Random Badges Logic
        if (enabledBadges.subscriber && (msg.isSub || Math.random() > 0.7))
          badges.push(BADGE_ASSETS.SUBSCRIBER);
        if (enabledBadges.vip && (msg.isVip || Math.random() > 0.95))
          badges.push(BADGE_ASSETS.VIP);
        if (enabledBadges.moderator && Math.random() > 0.98)
          badges.push(BADGE_ASSETS.MODERATOR);
        if (enabledBadges.verified && Math.random() > 0.99)
          badges.push(BADGE_ASSETS.VERIFIED);
        if (enabledBadges.prime && Math.random() > 0.9)
          badges.push(BADGE_ASSETS.PRIME_REAL);
        if (enabledBadges.broadcaster && Math.random() > 0.995)
          badges.push(BADGE_ASSETS.BROADCASTER);

        return {
          uniqueId: crypto.randomUUID(),
          username: msg.username,
          messageText: msg.messageText,
          badges: badges,
          colorUsername:
            colorsName[Math.floor(Math.random() * colorsName.length)],
        };
      });

      setMessagePool(processed);
      setIsStreaming(true);
    } catch (err) {
      console.error(err);
      setError("AI Generation failed. Check API Key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Streaming Logic (Seamless Infinite Loop)
  useEffect(() => {
    if (isStreaming && messagePool.length > 0) {
      intervalRef.current = setInterval(() => {
        const nextMsg = messagePool[poolIndexRef.current];

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        const uniqueId = crypto.randomUUID();

        const msgWithTime = { ...nextMsg, timestamp: timeStr, uniqueId };

        setVisibleMessages((prev) => {
          const newList = [...prev, msgWithTime];
          if (newList.length > 50) return newList.slice(1);
          return newList;
        });

        poolIndexRef.current = (poolIndexRef.current + 1) % messagePool.length;
      }, settings.chatSpeed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isStreaming, messagePool, settings.chatSpeed]);

  const stopStream = useCallback(() => setIsStreaming(false), []);
  const startStream = useCallback(() => setIsStreaming(true), []);
  const clearMessages = useCallback(() => setVisibleMessages([]), []);
  const addMessage = useCallback(
    (msg: ChatMessage) => setVisibleMessages((prev) => [...prev, msg]),
    [],
  );

  return {
    messagePool,
    visibleMessages,
    isStreaming,
    isLoading,
    error,
    generateChat,
    toggleStream: () => setIsStreaming((p) => !p),
    stopStream,
    startStream,
    clearMessages,
    addMessage,
  };
};
