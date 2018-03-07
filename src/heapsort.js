"use strict";

import defaultCompareFunction from "./defaultCompareFunction";
import defaultSwapFunction from "./defaultSwapFunction";

export default function heapsort(
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN HEAPSORT
  function sort() {
    buildMaxHeap();
    for (let i = length - 1; i >= 0; i--) {
      if (offset !== offset + i) swapFunction(arr, offset, offset + i);
      if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + i, offset + i + 1));
      length--;
      heapify(1);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + 1));
  }

  function buildMaxHeap() {
    for (let i = Math.floor(length / 2); i >= 0; i--) {
      heapify(i+1);
    }
  }

  function heapify(i) {
    // This functions needs to act like the array is 1 indexed.
    const left = i * 2;
    const right = left + 1;
    let max;

    if ((left <= length) && compareFunction(arr[offset + left - 1], arr[offset + i - 1]) > 0) {
      max = left;
    } else {
      max = i;
    }
    if ((right <= length) && compareFunction(arr[offset + right - 1], arr[offset + max - 1]) > 0) {
      max = right;
    }

    if (max !== i) {
      swapFunction(arr, offset + i - 1, offset + max - 1);
      heapify(max);
    }
  }

  sort();
  // END HEAPSORT

  return arr;
}
