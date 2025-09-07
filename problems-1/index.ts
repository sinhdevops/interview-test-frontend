type SumFunc = (n: number) => number;

var sum_to_n_a: SumFunc = (n: number) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
};

var sum_to_n_b: SumFunc = (n: number) => (n * (n + 1)) / 2;

var sum_to_n_c: SumFunc = (n: number) => {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
