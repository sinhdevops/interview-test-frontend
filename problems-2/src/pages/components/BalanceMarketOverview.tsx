import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useWalletBalances } from "@/store/walletStore.store";
import { getTokenIcon } from "@/utils/utils";

function BalanceMarketOverview() {
  const balances = useWalletBalances();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Wallet Overview</CardTitle>
        <CardDescription>Your current token balances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {Object.entries(balances)
            .sort(([a], [b]) => a.localeCompare(b))
            .filter(([, balance]) => balance > 0)
            .map(([currency, balance]) => (
              <div
                key={currency}
                className="flex justify-between items-center p-2 hover:bg-muted/50 rounded"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={getTokenIcon(currency)}
                    alt={currency}
                    className="w-4 h-4"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="text-sm font-medium">{currency}</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {balance.toLocaleString()}
                </Badge>
              </div>
            ))}
          {Object.values(balances).every((balance) => balance === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tokens available.</p>
              <p className="text-sm">
                Click "Reset Balances" to restore demo balances.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default BalanceMarketOverview;
