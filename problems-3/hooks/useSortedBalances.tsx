import React from "react";
import { IWalletBalance } from "../@types/wallet";
import { getPriority } from "../utils/blockchainPriority";

export const useSortedBalances = (
  balances?: IWalletBalance[]
): IWalletBalance[] => {
  return React.useMemo<IWalletBalance[]>(() => {
    if (!balances) return [];
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);
};
