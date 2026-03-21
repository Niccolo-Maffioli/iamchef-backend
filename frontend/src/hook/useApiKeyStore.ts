import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type apiStore = {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  resetApiKey: () => void;
}

const useApiKeyStore = create<apiStore>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (apiKey: string) => set({ apiKey }),
      resetApiKey: () => set({ apiKey: '' }),
    }),
    {
      name: 'intro-page-storage',
    }
  )
)

export default useApiKeyStore;