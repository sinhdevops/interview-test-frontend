import { ArrowUpDown, TrendingUp, Loader2, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import AmountInputValidation from "@/components/Input/AmountInputValidation";
import TokenSelectField from "@/components/Select/TokenSelectField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { usePrices } from "@/hooks/usePrices";
import { useWalletStore } from "@/store/walletStore.store";
import { calculateSwapAmount } from "@/utils/swapAmount";
import { swapSchema } from "@/validations/swap.schema";
import { Separator } from "@radix-ui/react-select";
import { INITIAL_VALUES } from "@/utils/constants/wallet.constant";

interface SwapFormData {
  fromToken: string;
  toToken: string;
  fromAmount: string;
}

function SwapTokenForm() {
  const [isSwapping, setIsSwapping] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const { balances, resetBalances, setBalance } = useWalletStore();
  const { data: prices } = usePrices();

  const methods = useForm<SwapFormData>({
    resolver: yupResolver(swapSchema),
    defaultValues: INITIAL_VALUES,
  });

  const availableTokens = React.useMemo(() => {
    if (!prices) return [];
    const currencies = [...new Set(prices.map((p) => p.currency))];
    return currencies.sort();
  }, [prices]);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = methods;

  const watchedValues = watch();
  const { fromToken, toToken, fromAmount } = watchedValues;

  const submitHandler = handleSubmit(async (values: SwapFormData) => {
    console.log(values, "values");
    try {
      // Simulate swap delay 2s
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const fromAmount = parseFloat(values.fromAmount);
      const currentFromBalance = balances[values.fromToken] || 0;
      const currentToBalance = balances[values.toToken] || 0;

      console.log(currentFromBalance);
      console.log(currentToBalance);

      setBalance(values.fromToken, currentFromBalance - fromAmount);
      setBalance(values.toToken, currentToBalance + calculatedAmount);

      reset();
      setCalculatedAmount(0);

      toast.success(
        "Swap completed successfully! Your balances have been updated."
      );
    } catch (error) {
      console.error("Swap failed:", error);
      toast.error("Could not fetch live prices. Using fallback demo prices.");
    } finally {
      setIsSwapping(false);
    }
  });

  const handleFlipTokens = () => {
    setValue("fromToken", toToken);
    setValue("toToken", fromToken);
    setValue("fromAmount", "");
    setCalculatedAmount(0);
  };

  // Calculate swap amount when inputs change
  useEffect(() => {
    if (prices && fromToken && toToken && fromAmount) {
      const fromPrice =
        prices.find((p) => p.currency === fromToken)?.price || 0;
      const toPrice = prices.find((p) => p.currency === toToken)?.price || 0;
      const amount = calculateSwapAmount(
        parseFloat(fromAmount),
        fromPrice,
        toPrice
      );
      setCalculatedAmount(amount);
    } else {
      setCalculatedAmount(0);
    }
  }, [prices, fromToken, toToken, fromAmount]);

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Currency Swap
        </CardTitle>
        <CardDescription>
          Exchange your tokens instantly with live market rates
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Swap Form */}
        <FormProvider {...methods}>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* From Section */}
            <div className="p-4 bg-muted/30 rounded-lg border">
              <TokenSelectField
                label="From"
                name="fromToken"
                options={availableTokens}
                disabled={isSwapping}
                error={errors.fromToken?.message}
                balance={fromToken ? balances[fromToken] : undefined}
              />

              <div className="mt-4">
                <AmountInputValidation
                  placeholder="0.0"
                  label="Amount"
                  name="fromAmount"
                  id="fromAmount"
                  disabled={isSwapping}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleFlipTokens}
                disabled={isSwapping}
                className="rounded-full border-2 hover:scale-105 transition-transform cursor-pointer"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* To Section */}
            <div className="p-4 bg-muted/30 rounded-lg border ">
              <TokenSelectField
                name="toToken"
                options={availableTokens}
                label="To"
                disabled={isSwapping}
                error={errors.toToken?.message}
                balance={toToken ? balances[toToken] : undefined}
              />

              <div className="mt-4">
                <AmountInputValidation
                  value={
                    calculatedAmount > 0 ? calculatedAmount.toFixed(8) : ""
                  }
                  name=""
                  onChange={() => {}}
                  placeholder="0.0"
                  label="You'll receive"
                  disabled={true}
                />
              </div>
            </div>

            {/* Exchange Rate Display */}
            {fromToken && toToken && prices && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Exchange Rate
                  </span>
                  {(() => {
                    const fromPrice =
                      prices.find((p) => p.currency === fromToken)?.price || 0;
                    const toPrice =
                      prices.find((p) => p.currency === toToken)?.price || 0;
                    const rate = fromPrice && toPrice ? fromPrice / toPrice : 0;

                    return (
                      <Badge variant="secondary" className="font-mono">
                        1 {fromToken} = {rate.toFixed(6)} {toToken}asdasd
                      </Badge>
                    );
                  })()}
                </div>
              </div>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isSwapping || !fromToken || !toToken || !fromAmount}
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isSwapping ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Swapping...
                  </>
                ) : (
                  "Swap Tokens"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetBalances}
                disabled={isSwapping}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Balances
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default SwapTokenForm;
