function mergeSort(arr) {
  if (arr.length <= 1) return arr; // Base case: already sorted

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // Sort left half
  const right = mergeSort(arr.slice(mid));     // Sort right half

  return merge(left, right); // Merge two sorted halves
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  // Merge elements in sorted order
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append any remaining elements
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

// Example usage:
const arr = [5, 2, 4, 7, 1, 3, 2, 6];
const sorted = mergeSort(arr);
console.log(sorted); // → [1, 2, 2, 3, 4, 5, 6, 7]