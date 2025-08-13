/* 
 * Classic recursive implementation of Fibonacci sequence
 **/
const fibonacciR = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacciR(n - 1) + fibonacciR(n - 2);
}

console.log(fibonacciR(10)); // Output: 55

 /*
 * Dynamic Programming implementation of Fibonacci sequence (Top-Down)
 * Memoization
 **/
const dpCalc = (n, dp) => {
  if (dp[n] !== -1) return dp[n];
  const dpVal = dpCalc(n - 1, dp) + dpCalc(n - 2, dp);
  dp[n] = dpVal;
  return dpVal;
}

const fibonacciDP = (n) => {
  const dp = new Array(n + 1).fill(-1);
  dp[0] = 0;
  dp[1] = 1;
  return dpCalc(n, dp);
}

console.log(fibonacciDP(10)); // Output: 55

/**
 * Modern-style Dynamic Programming implementation of Fibonacci sequence (Bottom-Up)
 **/
const dpCalcM = (n, dp) => {
    for (let i = 2; i <= n; i++) {
        [dp[1], dp[0]] = [dp[0] + dp[1], dp[1]];
    }
    return dp[1];
}

var fib = function(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    const dp = [0, 1];
    return dpCalcM(n, dp);
};
