'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultSwapFunction from './defaultSwapFunction';

export default function bogobogosort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN BOGOBOGOSORT
  function isArraySorted (end) {
    for (let i = offset + 1; i < offset + end + 1; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) return false;
    }
    return true;
  }

  function shuffle (end) {
    let counter = end + 1;
    // While there are elements in the array.
    while (counter > 0) {
      // Pick a random index.
      let index = offset + Math.floor(Math.random() * counter);
      // Decrease counter by 1.
      counter--;
      // And swap the last element with it.
      if (offset + counter !== index) {
        swapFunction(arr, offset + counter, index);
      }
    }
  }

  for (let i = offset; i < offset + length; i++) {
    shuffle(i);
    if (!isArraySorted(i)) i = offset - 1;
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END BOGOBOGOSORT

  return arr;
}
