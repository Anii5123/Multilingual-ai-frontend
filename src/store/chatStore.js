import { create } from 'zustand'

export const useChatStore = create((set) => ({
  messages: [],
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  clear: () => set({ messages: [] })
}))