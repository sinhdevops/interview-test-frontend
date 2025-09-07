import { PRIORITY_MAP } from "./constants/wallet.constants";

export const getPriority = (blockchain: string): number => {
  return PRIORITY_MAP[blockchain] ?? -99;
};
