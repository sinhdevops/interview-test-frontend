import * as yup from "yup";
import { useWalletStore } from "@/store/walletStore.store";

// Validation schema
export const swapSchema = yup
  .object({
    fromToken: yup.string().required("Please select a token to swap from"),
    toToken: yup.string().required("Please select a token to swap to"),
    fromAmount: yup
      .string()
      .required("Amount is required")
      .test("positive", "Amount must be greater than 0", (value) => {
        const num = parseFloat(value || "0");
        return num > 0;
      }),
  })
  .test("different-tokens", "Cannot swap the same token", function (values) {
    return values.fromToken !== values.toToken;
  })
  .test("sufficient-balance", "Insufficient balance", function (values) {
    const balances = useWalletStore.getState().balances;
    const amount = parseFloat(values.fromAmount || "0");
    return amount <= (balances[values.fromToken] || 0);
  });
