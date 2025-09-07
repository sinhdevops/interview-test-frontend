import { useSortedBalances } from "../hooks/useSortedBalances";

interface IWalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // added for clarity
}

interface IFormattedWalletBalance extends Omit<IWalletBalance, "blockchain"> {
  formatted: string;
}

interface WalletPageProps extends BoxProps {}

const WalletPage = ({ children, ...rest }: WalletPageProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useSortedBalances(balances);

  const formattedBalances: IFormattedWalletBalance[] = sortedBalances.map(
    (balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    })
  );

  const rows = formattedBalances.map((balance, index) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={`${balance.currency}-${index}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
