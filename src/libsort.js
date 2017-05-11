/**
 * LibSort.js
 *
 * Version 0.0.0-dev
 * Apache 2.0 License
 * Copyright 2017 Hunter Perrin
 */

function defaultCompareFunction(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function defaultSwapFunction(arr, index1, index2) {
	const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function quicksort(arr, options) {
  let offset = 0,
      length = arr.length - offset,
      maxDelta = 0,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
    if (options.maxDelta !== undefined) maxDelta = options.maxDelta;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
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
          if (compare < 0) {
            swapFunction(arr, curIndex, lastIndex);
            continue;
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
    if (curIndex - offset > maxDelta + 1) {
      // We need to sort the small side of the list.
      quicksort(arr, {offset: offset, length: curIndex - offset, maxDelta, compareFunction, swapFunction, sortedCallbackFunction});
    } else if (sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(offset, curIndex));
    }
    if (offset + length - curIndex - 1 > maxDelta + 1) {
      // We need to sort the big side of the list.
      quicksort(arr, {offset: curIndex + 1, length: offset + length - curIndex - 1, maxDelta, compareFunction, swapFunction, sortedCallbackFunction});
    } else if (sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(curIndex + 1, offset + length));
    }
  }
  return arr;
}
