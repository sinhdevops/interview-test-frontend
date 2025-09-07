export interface Token {
  currency: string;
  date: string;
  price: number;
}

export interface SwapFormData {
  fromToken: string;
  toToken: string;
  fromAmount: string;
}
