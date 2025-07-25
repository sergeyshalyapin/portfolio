const findMaxValue = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Invalid input");
  }

  return arr.reduce ((max, value) => max > value ? max : value, arr[0]);
  // return arr.reduce ((max, value) => Math.max(max, value), arr[0]);
};

const testArray = [1, 3, 2, 5, 4];
console.log("Max value in [1, 3, 2, 5, 4]:", findMaxValue(testArray)); // Output: 5
