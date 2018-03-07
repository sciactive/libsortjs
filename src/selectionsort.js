"use strict";

import defaultCompareFunction from "./defaultCompareFunction";
import defaultSwapFunction from "./defaultSwapFunction";

export default function selectionsort(
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN SELECTIONSORT
  for (let i = offset; i < offset + length; i++) {
    let min = i;
    for (let k = i + 1; k < offset + length; k++) {
      if (compareFunction(arr[k], arr[min]) < 0) {
        min = k;
      }
    }
    if (min !== i) {
      swapFunction(arr, i, min);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(i, i + 1));
  }
  // END SELECTIONSORT

  return arr;
}
