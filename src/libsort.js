/**
 * LibSort.js
 *
 * Version 0.0.1-dev
 * Apache 2.0 License
 * Copyright 2017 Hunter Perrin
 */
 "use strict";

export function defaultCompareFunction(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function defaultSwapFunction(arr, index1, index2) {
	const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

export function quicksort(arr, options, recursing) {
  let offset = 0,
      length = arr.length - offset,
      maxDelta = 0,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null,
      insertionLimit = 3;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
    if (options.maxDelta !== undefined) maxDelta = options.maxDelta;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  	if (options.insertionLimit !== undefined) insertionLimit = options.insertionLimit;
  }
  if (length <= maxDelta + 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // Let's see if we just need to make one quick comparison.
  if (length === 2) {
  	if (compareFunction(arr[offset], arr[offset + 1]) > 0) {
    	// Our one element is bigger than its sibling, so swap them.
      swapFunction(arr, offset, offset + 1);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + 2));
    return arr;
  }

  // BEGIN QUICKSORT
  let pivotIndex = offset + length - 1;
  // Swap an item from the middle of the list into the pivot index. Choosing a
  // pivot in the middle avoids worst time case when the list is already sorted.
  swapFunction(arr, offset + Math.floor(length / 2), pivotIndex);
  const pivot = arr[pivotIndex];

  let curIndex = offset;
  let lastIndex = offset + length - 2;
  let everythingIsEqual = true;
  while (curIndex <= lastIndex) {
  	// Compare the item with the pivot.
  	const compare = compareFunction(arr[curIndex], pivot);
    // Make sure the list is not just fully equal.
    if (compare !== 0) {
    	everythingIsEqual = false;
    }
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
  if (pivotIndex !== curIndex) {
    swapFunction(arr, curIndex, pivotIndex);
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(curIndex, curIndex + 1));

  // If everything is equal, then we're done.
  if (!everythingIsEqual) {
    // Let's see if we need to go deeper.
    const lengthSmallSide = curIndex - offset;
    if ((maxDelta > -1 && lengthSmallSide > maxDelta + 1) ||
        (maxDelta === -1 && lengthSmallSide > insertionLimit)) {
      // We need to sort the small side of the list.
      if (lengthSmallSide > insertionLimit) {
        quicksort(arr, {offset: offset, length: lengthSmallSide, maxDelta, compareFunction, swapFunction, sortedCallbackFunction, insertionLimit}, true);
      } else {
        insertionsort(arr, {offset: offset, length: lengthSmallSide, compareFunction, swapFunction, sortedCallbackFunction});
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(offset, curIndex));
    }
    const lengthBigSide = offset + length - curIndex - 1;
    if ((maxDelta > -1 && lengthBigSide > maxDelta + 1) ||
        (maxDelta === -1 && lengthBigSide > insertionLimit)) {
      // We need to sort the big side of the list.
      if (lengthBigSide > insertionLimit) {
        quicksort(arr, {offset: curIndex + 1, length: lengthBigSide, maxDelta, compareFunction, swapFunction, sortedCallbackFunction, insertionLimit}, true);
      } else {
        insertionsort(arr, {offset: curIndex + 1, length: lengthBigSide, compareFunction, swapFunction, sortedCallbackFunction});
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(curIndex + 1, offset + length));
    }
  }

  if (!recursing && maxDelta === -1) {
    insertionsort(arr, options);
  }

  // END QUICKSORT

  return arr;
}

export function shellsort(arr, options) {
  let offset = 0,
      length = arr.length - offset,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  }

  // BEGIN SHELLSORT
  let gapDenominator = 2, gap = Math.floor(length / gapDenominator);
  while (gap > 0) {
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
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END SHELLSORT

  return arr;
}

export function insertionsort(arr, options) {
  let offset = 0,
      length = arr.length - offset,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  }

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

export function bubblesort(arr, options) {
  let offset = 0,
      length = arr.length - offset,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  }

  // BEGIN BUBBLESORT
  let n = length;
  do {
    let m = 0;
    for (let i = offset + 1; i < n; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) {
        swapFunction(arr, i - 1, i);
        m = i;
      }
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(m, offset + length));
    n = m;
  } while (n != 0);
  // END BUBBLESORT

  return arr;
}
