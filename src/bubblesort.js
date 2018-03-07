"use strict";

import defaultCompareFunction from "./defaultCompareFunction";
import defaultSwapFunction from "./defaultSwapFunction";

export default function bubblesort(
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN BUBBLESORT
  let n = length;
  do {
    let m = offset, swaps = false;
    for (let i = m + 1; i < n; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) {
        swaps = true;
        swapFunction(arr, i - 1, i);
        m = i;
      }
    }
    if (!swaps) {
      if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
      break;
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(m, n));
    n = m;
  } while (n != 0);
  // END BUBBLESORT

  return arr;
}
