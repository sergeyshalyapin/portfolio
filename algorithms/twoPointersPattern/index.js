/**
 * Bidirectional Two Pointers Pattern
 * Example: Check if a string is a palindrome
 */
const isPalindrome = (str) => {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

/**
 * Same Direction Two Pointers Pattern (Sliding Window)
 * Example: Find the longest subarray with sum <= target
 */
const longestSubarrayWithSumLE = (arr, target) => {
  let left = 0, sum = 0, maxLen = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum > target && left <= right) {
      sum -= arr[left];
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// Example usage:
console.log(isPalindrome("racecar")); // true
console.log(longestSubarrayWithSumLE([1, 2, 1, 0, 1, 1, 0], 3)); // 5
