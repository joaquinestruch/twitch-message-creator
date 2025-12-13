import { create } from 'zustand';

interface ChatState {
  username: string;
  messageText: string;
  colorUsername: string;
  embledsArray: string[];
  isModalOpen: boolean;

  setUsername: (username: string) => void;
  setMessageText: (messageText: string) => void;
  setColorUsername: (colorUsername: string) => void;
  setEmbledsArray: (embledsArray: string[] | ((prev: string[]) => string[])) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  username: '',
  messageText: '',
  colorUsername: '', // Default color logic might need to be handled here or in component if it was dynamic
  embledsArray: [],
  isModalOpen: false,

  setUsername: (username) => set({ username }),
  setMessageText: (messageText) => set({ messageText }),
  setColorUsername: (colorUsername) => set({ colorUsername }),
  setEmbledsArray: (updater) =>
    set((state) => {
      if (typeof updater === 'function') {
        return { embledsArray: updater(state.embledsArray) };
      }
      return { embledsArray: updater };
    }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
}));
