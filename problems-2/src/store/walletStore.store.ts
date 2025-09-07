import { DEFAULT_BALANCES } from "../utils/constants/wallet.constant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  balances: Record<string, number>;
  setBalance: (currency: string, amount: number) => void;
  resetBalances: () => void;
}

const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balances: DEFAULT_BALANCES,
      setBalance: (currency: string, amount: number) =>
        set((state) => ({
          balances: { ...state.balances, [currency]: amount },
        })),
      resetBalances: () => set({ balances: DEFAULT_BALANCES }),
    }),
    {
      name: "wallet-storage",
    }
  )
);

export { useWalletStore };

export const useWalletBalances = () =>
  useWalletStore((state) => state.balances);
