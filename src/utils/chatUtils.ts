import { EMOTES } from "./embleds";

export const parseWithEmotes = (text: string): string => {
  if (!text) return "";
  let newText = text;
  Object.keys(EMOTES).forEach((emote) => {
    const url = EMOTES[emote];
    // Replace whole word matches only
    const regex = new RegExp(`\\b${emote}\\b`, "g");
    // Add onerror handler to revert to text if image fails
    const imgTag = `<img src="${url}" class="chat-emote" style="height:24px; vertical-align:middle; margin:0 2px;" alt="${emote}" onerror="this.style.display='none';this.after(document.createTextNode(this.alt));" />`;
    newText = newText.replace(regex, imgTag);
  });
  return newText;
};
