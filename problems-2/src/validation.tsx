const validateSwapForm = (
  formData: SwapFormData,
  balances: Record<string, number>
) => {
  const errors: Partial<Record<keyof SwapFormData | "general", string>> = {};

  if (!formData.fromToken) {
    errors.fromToken = "Please select a token to swap from";
  }

  if (!formData.toToken) {
    errors.toToken = "Please select a token to swap to";
  }

  if (
    formData.fromToken &&
    formData.toToken &&
    formData.fromToken === formData.toToken
  ) {
    errors.general = "Cannot swap the same token";
  }

  if (!formData.fromAmount) {
    errors.fromAmount = "Amount is required";
  } else {
    const amount = parseFloat(formData.fromAmount);
    if (isNaN(amount) || amount <= 0) {
      errors.fromAmount = "Amount must be greater than 0";
    } else if (
      formData.fromToken &&
      amount > (balances[formData.fromToken] || 0)
    ) {
      errors.fromAmount = "Insufficient balance";
    }
  }

  return errors;
};

export { validateSwapForm };
