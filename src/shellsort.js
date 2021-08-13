'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultSwapFunction from './defaultSwapFunction';
import defaultInsertFunction from './defaultInsertFunction';

export default function shellsort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    insertFunction = defaultInsertFunction, // Only used to pass to switchFunction.
    sortedCallbackFunction = null,
    switchLimit = 0,
    switchFunction = null
  }
) {
  // BEGIN SHELLSORT
  let gapDenominator = 2;
  let gap = Math.floor(length / gapDenominator);
  while (gap > switchLimit) {
    for (let i = offset + gap; i < offset + length; i++) {
      let k = i;
      while (k - gap >= offset && compareFunction(arr[k - gap], arr[k]) > 0) {
        swapFunction(arr, k - gap, k);
        k -= gap;
      }
    }
    gapDenominator *= 2;
    gap = Math.floor(length / gapDenominator);
  }
  if (switchLimit > 0) switchFunction(arr, {offset, length, compareFunction, swapFunction, insertFunction, sortedCallbackFunction, switchLimit, switchFunction});
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END SHELLSORT

  return arr;
}
