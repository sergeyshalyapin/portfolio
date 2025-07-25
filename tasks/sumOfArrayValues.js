const arrSum = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }
  
  return arr.reduce((sum, num) => {
    if (typeof num !== 'number') {
      throw new TypeError("All elements in the array must be numbers");
    }
    return sum + num;
  }, 0);
}

const testArray1 = [1, 2, 3, 4, 5];
const testArray2 = [10, 20, 30];

console.log("Sum of testArray1:", arrSum(testArray1)); // Output: 15
console.log("Sum of testArray2:", arrSum(testArray2)); // Output: 60
