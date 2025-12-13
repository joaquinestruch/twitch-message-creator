import { BIT_ASSETS } from "../utils/embleds";

export const useStreamEvents = (addMessage, manualUsername) => {
  const triggerEvent = (type) => {
    let msgData = {};
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
    addMessage(msgData);
  };

  return { triggerEvent };
};
