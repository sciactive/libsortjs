'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultSwapFunction from './defaultSwapFunction';
import defaultInsertFunction from './defaultInsertFunction';

export default function quicksort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    maxDelta = 0,
    compareFunction = defaultCompareFunction,
    swapFunction = defaultSwapFunction,
    insertFunction = defaultInsertFunction, // Only used to pass to switchFunction.
    sortedCallbackFunction = null,
    switchLimit = 0,
    switchFunction = null
  },
  recursing
) {
  if (length <= maxDelta + 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // BEGIN QUICKSORT
  // Let's see if we just need to make one quick comparison.
  if (length === 2) {
    if (compareFunction(arr[offset], arr[offset + 1]) > 0) {
      // Our one element is bigger than its sibling, so swap them.
      swapFunction(arr, offset, offset + 1);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + 2));
    return arr;
  }
  // Select the median of three as the pivot and swap into place.
  const mIndex = offset + Math.floor(length / 2);
  const hIndex = mIndex + 1;
  const lIndex = mIndex - 1;
  const pivotIndex = offset + length - 1;
  let median = lIndex;
  if (length > 5) {
    // I don't move the other elements because it kills the algorithm on
    // reversed arrays.
    const lm = compareFunction(arr[lIndex], arr[mIndex]);
    const mh = compareFunction(arr[mIndex], arr[hIndex]);
    const lh = compareFunction(arr[lIndex], arr[hIndex]);
    if (lm < 0) {
      if (mh < 0) {
        median = mIndex;
      } else if (lh < 0) {
        median = hIndex;
      }
    } else {
      if (mh > 0) {
        median = mIndex;
      } else if (lh > 0) {
        median = hIndex;
      }
    }
  }
  if (median !== pivotIndex) swapFunction(arr, median, pivotIndex);
  const pivot = arr[pivotIndex];

  // Start from the points after where we've already checked looking for the
  // pivot.
  let curIndex = offset;
  let lastIndex = offset + length - 2;
  let everythingIsEqual = true;
  while (curIndex <= lastIndex) {
    // Compare the item with the pivot.
    const compare = compareFunction(arr[curIndex], pivot);
    // Make sure the list is not just fully equal.
    if (compare !== 0) everythingIsEqual = false;
    if (compare < 0) {
      // If it is less than the pivot, it is where it belongs, so move forward.
      curIndex++;
    } else {
      // If it is greater than or equal to the pivot, it needs to move to the
      // end of the array, and the one before that is our new last index.
      if (curIndex !== lastIndex) {
        // Look for an item on the other side of the array that is out of place
        // too. Swap it with that one.
        while (curIndex < lastIndex) {
          // Compare the item with the last index.
          const compare = compareFunction(arr[lastIndex], pivot);
          // Make sure the list is not just fully equal.
          if (compare !== 0) everythingIsEqual = false;
          if (compare <= 0) {
            swapFunction(arr, curIndex, lastIndex);
            if (compare < 0) curIndex++;
            break;
          } else {
            lastIndex--;
          }
        }
      }
      lastIndex--;
    }
  }

  // Now everything at curIndex and onward is greater than or equal to our
  // pivot, and everything before curIndex is less than our pivot. Swap pivot.
  if (pivotIndex !== curIndex) swapFunction(arr, curIndex, pivotIndex);
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(curIndex, curIndex + 1));

  // If everything is equal, then we're done.
  if (everythingIsEqual) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  } else {
    // Let's see if we need to go deeper.
    const lengthSmallSide = curIndex - offset;
    if ((maxDelta > -1 && lengthSmallSide > maxDelta + 1) ||
        (maxDelta === -1 && lengthSmallSide > switchLimit)) {
      // We need to sort the small side of the list.
      if (lengthSmallSide > switchLimit) {
        quicksort(arr, {offset: offset, length: lengthSmallSide, maxDelta, compareFunction, swapFunction, insertFunction, sortedCallbackFunction, switchLimit, switchFunction}, true);
      } else {
        switchFunction(arr, {offset: offset, length: lengthSmallSide, maxDelta, compareFunction, swapFunction, insertFunction, sortedCallbackFunction});
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(offset, curIndex));
    }
    const lengthBigSide = offset + length - curIndex - 1;
    if ((maxDelta > -1 && lengthBigSide > maxDelta + 1) ||
        (maxDelta === -1 && lengthBigSide > switchLimit)) {
      // We need to sort the big side of the list.
      if (lengthBigSide > switchLimit) {
        quicksort(arr, {offset: curIndex + 1, length: lengthBigSide, maxDelta, compareFunction, swapFunction, insertFunction, sortedCallbackFunction, switchLimit, switchFunction}, true);
      } else {
        switchFunction(arr, {offset: curIndex + 1, length: lengthBigSide, maxDelta, compareFunction, swapFunction, insertFunction, sortedCallbackFunction});
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(curIndex + 1, offset + length));
    }
  }

  if (!recursing && maxDelta === -1) switchFunction(arr, {offset, length, maxDelta, compareFunction, swapFunction, insertFunction, sortedCallbackFunction});

  // END QUICKSORT

  return arr;
}
