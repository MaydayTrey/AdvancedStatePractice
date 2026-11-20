import { create } from 'zustand'

const useToastStore = create((set, get) => ({
  message: null,
  timeoutId: null,
  actions: {
    show: (message, seconds = 5) => {
      const pending = get().timeoutId
      if (pending) {
        clearTimeout(pending)
      }

      const id = setTimeout(() => {
        set({ message: null, timeoutId: null })
      }, seconds * 1000)

      set({ message, timeoutId: id })
    },
    hide: () => {
      const pending = get().timeoutId
      if (pending) {
        clearTimeout(pending)
      }
      set({ message: null, timeoutId: null })
    },
  },
}))

export const useToast = () => useToastStore(state => state.message)
export const useToastActions = () => useToastStore(state => state.actions)

export const toast = (message, seconds) =>
  useToastStore.getState().actions.show(message, seconds)

export default useToastStore