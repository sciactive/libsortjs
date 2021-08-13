'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultSwapFunction from './defaultSwapFunction';

export default function insertionsort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN INSERTIONSORT
  for (let i = offset + 1; i < offset + length; i++) {
    let k = i;
    while (k > offset && compareFunction(arr[k - 1], arr[k]) > 0) {
      swapFunction(arr, k - 1, k);
      k--;
    }
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END INSERTIONSORT

  return arr;
}
