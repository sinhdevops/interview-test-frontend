import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePrices } from "@/hooks/usePrices";
import { getTokenIcon } from "@/utils/utils";
import { TrendingUp } from "lucide-react";

function InfoLiveMarketPrice() {
  const { data: prices } = usePrices();
  return (
    prices &&
    prices.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Live Market Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {prices
              .sort((a, b) => a.currency.localeCompare(b.currency))
              .map((token) => (
                <div
                  key={`${token.currency}-${Math.random()}`}
                  className="flex justify-between items-center p-2 hover:bg-muted/50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={getTokenIcon(token.currency)}
                      alt={token.currency}
                      className="w-4 h-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="text-sm font-medium">
                      {token.currency}
                    </span>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    ${token.price.toLocaleString()}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    )
  );
}

export default InfoLiveMarketPrice;
