const binarySearch = (list, target) => {
  let lowIndex = 0;
  let highIndex = list.length - 1;

  if (target > list[highIndex], target < list[lowIndex]) return "error";

  // Steps for logging the search process
  // This is not necessary for the algorithm, but useful for debugging
  // and understanding how the binary search works
  let step = 1;

  // The limit is the maximum number of steps needed to find the target
  // ! Complexity of binary search is O(log n)
  const limit = Math.floor(Math.log2(list.length)) + 1;

  while(step <= limit) {
    const halfIndex = Math.floor((highIndex + lowIndex) / 2);
    const guess = list[halfIndex];

    console.log("step", step, "out of", limit, ", guess is", guess);

    if (guess < target) {
      lowIndex = halfIndex + 1;

    } else if (guess > target) {
      highIndex = halfIndex - 1;

    } else {
      return guess;
    }
    step++;
  }
}

const testList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
                  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                  91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

const testTarget = 19;

const searchResult = binarySearch(testList, testTarget);
console.log(`Search result for ${testTarget} is:`, searchResult);
