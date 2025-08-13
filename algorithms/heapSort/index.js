function maxHeapify(A, i, heapSize) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largest = i;

  if (left < heapSize && A[left] > A[largest]) {
    largest = left;
  }
  if (right < heapSize && A[right] > A[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [A[i], A[largest]] = [A[largest], A[i]];
    maxHeapify(A, largest, heapSize);
  }
}

function buildMaxHeap(A) {
  const n = A.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    maxHeapify(A, i, n);
  }
}

function heapSort(A) {
  buildMaxHeap(A);
  for (let i = A.length - 1; i > 0; i--) {
    [A[0], A[i]] = [A[i], A[0]];
    maxHeapify(A, 0, i);
  }
}

const sortedArray = heapSort([5, 2, 4, 7, 1, 3, 2, 6]);

console.log(sortedArray); // → [1, 2, 2, 3, 4, 5, 6, 7]