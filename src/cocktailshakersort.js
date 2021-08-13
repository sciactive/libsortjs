'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultSwapFunction from './defaultSwapFunction';

export default function cocktailshakersort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN COCKTAILSHAKERSORT
  let nRight = offset + length;
  let nLeft = offset;
  do {
    let m = nLeft;
    let swaps = false;
    for (let i = m + 1; i < nRight; i++) {
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
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(m, nRight));
    nRight = m;
    m = nRight - 1; swaps = false;
    for (let i = m - 1; i >= nLeft; i--) {
      if (compareFunction(arr[i], arr[i + 1]) > 0) {
        swaps = true;
        swapFunction(arr, i, i + 1);
        m = i;
      }
    }
    if (!swaps) {
      if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
      break;
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(nLeft, m + 1));
    nLeft = m + 1;
  } while (nRight !== nLeft);
  // END COCKTAILSHAKERSORT

  return arr;
}
