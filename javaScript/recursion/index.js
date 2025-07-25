const factorial = (n) => {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log("factorial(0):", factorial(0)); // 1
console.log("factorial(5):", factorial(5)); // 120
console.log("factorial(10):", factorial(10)); // 3628800

const fibonacci = (n) => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("fibonacci(2):", fibonacci(2)); // 1
console.log("fibonacci(5):", fibonacci(5)); // 5
console.log("fibonacci(10):", fibonacci(10)); // 55

const arraySum = (arr) => {
  console.log("arraySum called with:", arr);
  if (arr.length === 0) return 0;
  return arr[0] + arraySum(arr.slice(1));
}

console.log("arraySum([1, 2, 3]):", arraySum([1, 2, 3])); // 6

const findMaxValue = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Invalid input");
  }

  const helperFunc = (index, max) => {
    if (index === arr.length) {
      return max;
    }
    return helperFunc(index + 1, Math.max(max, arr[index]));
  };

  return helperFunc(0, arr[0]);
};

console.log("findMaxValue([1, 3, 2, 5, 4]):", findMaxValue([1, 3, 2, 5, 4])); // 5
