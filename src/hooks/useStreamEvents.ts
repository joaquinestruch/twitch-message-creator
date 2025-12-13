import { BIT_ASSETS } from "../utils/embleds";

import { ChatMessage } from "../types";

export const useStreamEvents = (
  addMessage: (msg: ChatMessage) => void,
  manualUsername: string,
) => {
  const triggerEvent = (type: "sub" | "gift" | "cheer" | "donation") => {
    let msgData: Partial<ChatMessage> = {};
    const base = {
      uniqueId: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isEvent: true,
      eventType: type,
    };

    switch (type) {
      case "sub":
        msgData = {
          ...base,
          messageText: "Just subscribed with Prime! ",
          systemText: "subscribed with Prime.",
        };
        break;
      case "gift":
        msgData = {
          ...base,
          messageText: "gifted 5 Subs to the community! ",
          systemText: "gifted 5 Subs!",
        };
        break;
      case "cheer":
        // Animated Bit Logic
        const bitUrl = BIT_ASSETS["10000"];
        const bitHtml = `<img src="${bitUrl}" style="width:28px; vertical-align:middle; margin-right:4px;" alt="cheer10000"/> <span style="color:#ff383b; fontWeight:bold">cheer10000</span>`;

        msgData = {
          ...base,
          messageText: `cheered! ${bitHtml} WOW!`,
          systemText: "cheered 10000 bits!",
        };
        break;
      case "donation":
        msgData = {
          ...base,
          messageText: "donated $50.00! ",
          systemText: "donated $50.00!",
        };
        break;
      default:
        return;
    }

    msgData.username = manualUsername || "Anonymous";
    // Badges for events? Usually subs get sub badge, but logic here seems simple.
    // We need to ensure 'badges' is present for ChatMessage type compliance if strict.
    // The current logic doesn't set badges for events explicitly in the switch, 
    // but the component might handle it or we should add empty array.
    msgData.badges = []; 
    
    addMessage(msgData as ChatMessage);
  };

  return { triggerEvent };
};
