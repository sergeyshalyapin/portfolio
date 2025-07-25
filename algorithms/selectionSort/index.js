const selectionSort = (arr) => {
  const result = [...arr]; // Create a copy of the input array to avoid mutating the original
  for (let i = 0; i < result.length - 1; i++) { // Iterate through the array except the last element
    let smallestIndex = i; // Assume the first unsorted element is the smallest

    for (let j = i + 1; j < result.length; j++) { // Iterate through the unsorted part of the array
      if (result[j] < result[smallestIndex]) {
        smallestIndex = j; // Find the index of the smallest element by comparing with the current smallest
      }
    }

    if (smallestIndex !== i) { // If the smallest element is not the first unsorted element
      [result[i], result[smallestIndex]] = [result[smallestIndex], result[i]]; // Swap the smallest element with the first unsorted element
    }
  }
  return result; // Return the sorted array
}

const testArray = [6, 2, 8, 2, 5, 1, 3, 2, 10, 99, 9, 4, 7];
const sortedArray = selectionSort(testArray);
console.log("Original array:", testArray); // Output: [6, 2, 8, 2, 5, 1, 3, 2, 10, 99, 9, 4, 7]
console.log("Sorted array:", sortedArray); // Output: [1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99]
