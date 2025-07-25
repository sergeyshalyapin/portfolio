const quickSort = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  if (arr.length <= 1 ) { // Cases for empty or single element arrays
    return arr;
  }

  const pivot = arr[arr.length - 1]; // Choose the last element as the pivot
  const less = []; // Array for elements less than the pivot
  const greater = []; // Array for elements greater than or equal to the pivot

  for (let i = 0; i < arr.length - 1; i++) { // Loop through all elements except the pivot
    if (arr[i] < pivot) {
      less.push(arr[i]); // Elements less than pivot go to first part
    }
    else {
      greater.push(arr[i]); // Elements greater than or equal to pivot go to last part
    }
  }

  // Recursively apply quickSort to the partitions
  return [...quickSort(less), pivot, ...quickSort(greater)];
};

const testArray = [3, 6, 8, 10, 1, 2, 1];
console.log("Original array: [3, 6, 8, 10, 1, 2, 1]");
console.log("Sorted array:", quickSort(testArray));
