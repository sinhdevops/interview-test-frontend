const calculateSwapAmount = (
  fromAmount: number,
  fromPrice: number,
  toPrice: number
): number => {
  if (!fromPrice || !toPrice || !fromAmount) return 0;
  return (fromAmount * fromPrice) / toPrice;
};

const getTokenIcon = (currency: string) => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
};

export { calculateSwapAmount, getTokenIcon };
