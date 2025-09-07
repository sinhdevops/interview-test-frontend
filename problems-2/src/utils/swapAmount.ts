export const calculateSwapAmount = (
  fromAmount: number,
  fromPrice: number,
  toPrice: number
): number => {
  if (!fromPrice || !toPrice || !fromAmount) return 0;
  return (fromAmount * fromPrice) / toPrice;
};
