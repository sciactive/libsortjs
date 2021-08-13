'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultSwapFunction from './defaultSwapFunction';

export default function oddevensort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN ODDEVENSORT
  let i = 0;
  let swaps = false;
  do {
    if (i % 2) swaps = false;
    for (; i + 1 < length; i += 2) {
      if (compareFunction(arr[offset + i], arr[offset + i + 1]) > 0) {
        swaps = true;
        swapFunction(arr, offset + i, offset + i + 1);
      }
    }
    i = (i + 1) % 2;
  } while (swaps || !(i % 2));
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END ODDEVENSORT

  return arr;
}
