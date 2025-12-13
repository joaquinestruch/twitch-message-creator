export interface ChatMessage {
  uniqueId: string;
  timestamp?: string;
  username: string;
  messageText: string;
  badges: string[]; // URLs of badge images
  colorUsername?: string;
  isEvent?: boolean;
  eventType?: 'sub' | 'gift' | 'cheer' | 'donation';
  systemText?: string;
}

export interface BadgeMap {
  [key: string]: boolean;
}

export interface ChatSettings {
  channelName: string;
  chatSpeed: number;
  complexity: string; // 'simple' | 'mixed' | 'complex'
  language: string; // 'en' | 'es'
  messageCount: number;
  enabledBadges: BadgeMap;
}

export interface ChatGenerationParams extends Partial<ChatSettings> {
  scenarioType?: string | null;
  availableEmotes?: string;
}

export interface OpenAIResponse {
  username: string;
  messageText: string;
  isVip: boolean;
  isSub: boolean;
}
