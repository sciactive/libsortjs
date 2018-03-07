"use strict";

import defaultCompareFunction from "./defaultCompareFunction";
import defaultSwapFunction from "./defaultSwapFunction";

export default function bogosort(
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    sortedCallbackFunction = null
  }
) {
  // BEGIN BOGOSORT
  function isArraySorted() {
    for (let i = offset + 1; i < offset + length; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) return false;
    }
    return true;
  }

  function shuffle() {
    let counter = length;
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

  while (!isArraySorted()) {
    shuffle();
  };
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END BOGOSORT

  return arr;
}
