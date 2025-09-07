import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { usePrices } from "@/hooks/usePrices";
import InfoLiveMarketPrice from "./components/InfoLiveMarketPrice";
import BalanceMarketOverview from "./components/BalanceMarketOverview";
import SwapTokenForm from "./components/SwapTokenForm";

const App = () => {
  const { isLoading: pricesLoading } = usePrices();

  if (pricesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-96">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="text-muted-foreground">Loading market data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="container-custom gap-4 grid grid-cols-2 mx-auto space-y-6">
        {/* Main Swap Card */}
        <SwapTokenForm />

        <div className="flex flex-col gap-4">
          {/* Info Cards */}
          <InfoLiveMarketPrice />

          {/* Balance Card */}
          <BalanceMarketOverview />
        </div>
      </div>
    </div>
  );
};

export default App;
