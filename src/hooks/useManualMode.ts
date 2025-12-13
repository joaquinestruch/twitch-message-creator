import { useState } from 'react';
import { BADGE_ASSETS } from '@/utils/embleds';
import { ChatMessage } from '@/types';

export const useManualMode = (addMessage: (msg: ChatMessage) => void) => {
  const [manualUsername, setManualUsername] = useState<string>('Streamer');
  const [manualMessage, setManualMessage] = useState<string>('');
  const [manualColor, setManualColor] = useState<string>('#FF0000');
  const [manualBadges, setManualBadges] = useState<Record<string, boolean>>({
    broadcaster: false,
    moderator: false,
    verified: false,
    vip: false,
    subscriber: true,
    prime: false,
  });

  const handleAddManualMessage = () => {
    if (!manualMessage.trim()) return;

    const badges: string[] = [];
    if (manualBadges.broadcaster) badges.push(BADGE_ASSETS.BROADCASTER);
    if (manualBadges.moderator) badges.push(BADGE_ASSETS.MODERATOR);
    if (manualBadges.verified) badges.push(BADGE_ASSETS.VERIFIED);
    if (manualBadges.vip) badges.push(BADGE_ASSETS.VIP);
    if (manualBadges.subscriber) badges.push(BADGE_ASSETS.SUBSCRIBER);
    if (manualBadges.prime) badges.push(BADGE_ASSETS.PRIME_REAL);

    const newMessage: ChatMessage = {
      uniqueId: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      username: manualUsername || 'User',
      messageText: manualMessage,
      badges: badges,
      colorUsername: manualColor,
    };

    addMessage(newMessage);
    setManualMessage('');
  };

  return {
    manualUsername,
    setManualUsername,
    manualMessage,
    setManualMessage,
    manualColor,
    setManualColor,
    manualBadges,
    setManualBadges,
    handleAddManualMessage,
  };
};
