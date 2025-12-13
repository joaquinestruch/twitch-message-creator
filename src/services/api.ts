import { ChatGenerationParams, OpenAIResponse } from "../types";

export const generateChatStream = async (
  params: ChatGenerationParams
): Promise<OpenAIResponse[]> => {
  const {
    channelName,
    complexity,
    language,
    messageCount,
    scenarioType,
    availableEmotes,
  } = params;

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channelName,
      complexity,
      language,
      messageCount,
      scenarioType,
      availableEmotes,
    }),
  });

  if (!response.ok) {
    let errorMsg = "Failed to fetch";
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorMsg;
    } catch (e) {
      // Ignore json parse error on error response
    }
    throw new Error(errorMsg);
  }

  if (!response.body) throw new Error("No response body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let content = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    content += decoder.decode(value, { stream: true });
  }

  // Clean up markdown code blocks if present
  const jsonStr = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse JSON response:", jsonStr);
    throw new Error("Invalid response format from AI");
  }
};
