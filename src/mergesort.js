"use strict";

import defaultCompareFunction from "./defaultCompareFunction";
import defaultInsertFunction from "./defaultInsertFunction";

export default function mergesort(
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    maxDelta = 0, // I think maxDelta here is working more like a "percentage off".
    compareFunction = defaultCompareFunction,
    insertFunction = defaultInsertFunction,
    sortedCallbackFunction = null
  },
  recursing
) {
  if (length <= 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // BEGIN MERGESORT
  // Let's see if we just need to make one quick comparison.
  if (length === 2) {
  	if (compareFunction(arr[offset], arr[offset + 1]) > 0) {
    	// Our one element is bigger than its sibling, so swap them.
      const temp = arr[offset];
      insertFunction(arr, offset, arr[offset + 1]);
      insertFunction(arr, offset + 1, temp);
    }
    return arr;
  }
  const mid = Math.floor(length / 2);
  if (mid > maxDelta + 1) {
    mergesort(arr, {offset: offset, length: mid, maxDelta, compareFunction, insertFunction, sortedCallbackFunction}, true);
  }
  if (length - mid > maxDelta + 1) {
    mergesort(arr, {offset: offset + mid, length: length - mid, maxDelta, compareFunction, insertFunction, sortedCallbackFunction}, true);
  }
  const left = arr.slice(offset, offset + mid);
  const right = arr.slice(offset + mid, offset + length);
  let lIndex = 0, rIndex = 0, aIndex = 0;
  while (lIndex < left.length && rIndex < right.length) {
    if (left[lIndex] === undefined || right[rIndex] === undefined) {
      debugger;
    }
    const compare = compareFunction(left[lIndex], right[rIndex]);
    if (compare <= 0) {
      insertFunction(arr, offset + aIndex, left[lIndex]);
      lIndex++;
    } else {
      insertFunction(arr, offset + aIndex, right[rIndex]);
      rIndex++;
    }
    if (!recursing && sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + aIndex, offset + aIndex + 1));
    aIndex++;
  }
  while (lIndex < left.length) {
    insertFunction(arr, offset + aIndex, left[lIndex]);
    lIndex++;
    if (!recursing && sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + aIndex, offset + aIndex + 1));
    aIndex++;
  }
  while (rIndex < left.length) {
    insertFunction(arr, offset + aIndex, right[rIndex]);
    rIndex++;
    if (!recursing && sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + aIndex, offset + aIndex + 1));
    aIndex++;
  }
  // END MERGESORT

  return arr;
}
