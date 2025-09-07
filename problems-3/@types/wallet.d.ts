export interface IWalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // added miss props
}

export interface IFormattedWalletBalance
  extends Omit<IWalletBalance, "blockchain"> {
  formatted: string;
}
