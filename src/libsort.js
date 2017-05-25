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

export function defaultInsertFunction(arr, index, element) {
  arr[index] = element;
}

export function zipsort(arr, options, recursing) {
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

  if (length <= 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // BEGIN ZIPSORT
  // Let's see if we just need to make one quick comparison.
  if (length === 2) {
  	if (compareFunction(arr[offset], arr[offset + 1]) > 0) {
    	// Our one element is bigger than its sibling, so swap them.
      swapFunction(arr, offset, offset + 1);
      if (recursing) return true;
    }
    if (recursing) return false;
    return arr;
  }
  const mid = Math.floor(length / 2);
  let swapped;
  do {
    swapped = false;
    if ((mid + 1) > 1) {
      swapped = zipsort(arr, {offset: offset, length: (mid + 1), compareFunction, swapFunction, sortedCallbackFunction}, true) && swapped;
    }
    if (length - mid > 1) {
      swapped = zipsort(arr, {offset: offset + mid, length: length - mid, compareFunction, swapFunction, sortedCallbackFunction}, true) && swapped;
    }
    for (let i = 0; i < mid; i++) {
      let iRight = length - 1 - i;
      if (i === iRight) iRight++;
    	if (compareFunction(arr[offset + i], arr[offset + iRight]) > 0) {
        swapFunction(arr, offset + i, offset + iRight);
        swapped = true;
      }
    }
  } while (!recursing && swapped);
  if (!recursing && sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));

  if (recursing) return swapped;
  // END ZIPSORT

  return arr;
}

export function quicksort(arr, options, recursing) {
  let offset = 0,
      length = arr.length - offset,
      maxDelta = 0,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null,
      switchLimit = 0,
      switchFunction = insertionsort;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
    if (options.maxDelta !== undefined) maxDelta = options.maxDelta;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  	if (options.switchLimit !== undefined) switchLimit = options.switchLimit;
  	if (options.switchFunction !== undefined) switchFunction = options.switchFunction;
  }
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
        (maxDelta === -1 && lengthSmallSide > switchLimit)) {
      // We need to sort the small side of the list.
      if (lengthSmallSide > switchLimit) {
        quicksort(arr, {offset: offset, length: lengthSmallSide, maxDelta, compareFunction, swapFunction, sortedCallbackFunction, switchLimit, switchFunction}, true);
      } else {
        switchFunction(arr, {offset: offset, length: lengthSmallSide, maxDelta, compareFunction, swapFunction, sortedCallbackFunction});
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(offset, curIndex));
    }
    const lengthBigSide = offset + length - curIndex - 1;
    if ((maxDelta > -1 && lengthBigSide > maxDelta + 1) ||
        (maxDelta === -1 && lengthBigSide > switchLimit)) {
      // We need to sort the big side of the list.
      if (lengthBigSide > switchLimit) {
        quicksort(arr, {offset: curIndex + 1, length: lengthBigSide, maxDelta, compareFunction, swapFunction, sortedCallbackFunction, switchLimit, switchFunction}, true);
      } else {
        switchFunction(arr, {offset: curIndex + 1, length: lengthBigSide, maxDelta, compareFunction, swapFunction, sortedCallbackFunction});
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(curIndex + 1, offset + length));
    }
  }

  if (!recursing && maxDelta === -1) {
    switchFunction(arr, options);
  }

  // END QUICKSORT

  return arr;
}

export function mergesort(arr, options, recursing) {
  let offset = 0,
      length = arr.length - offset,
      maxDelta = 0, // I think maxDelta here is working more like a "percentage off".
      compareFunction = defaultCompareFunction,
      insertFunction = defaultInsertFunction,
      sortedCallbackFunction = null;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
    if (options.maxDelta !== undefined) maxDelta = options.maxDelta;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.insertFunction !== undefined) insertFunction = options.insertFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  }

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

export function heapsort(arr, options) {
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

  // BEGIN HEAPSORT
  function sort() {
    buildMaxHeap();
    for (let i = length - 1; i > 0; i--) {
      swapFunction(arr, offset, offset + i);
      if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + i, offset + i + 1));
      length--;
      heapify(0);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + 1));
  }

  function buildMaxHeap() {
    for (let i = Math.floor((length - 1) / 2); i >= 0; i--) {
      heapify(i);
    }
  }

  function heapify(i) {
    const left = i * 2;
    const right = left + 1;
    let max;

    if ((left <= length - 1) && compareFunction(arr[offset + left], arr[offset + i]) > 0) {
      max = left;
    } else {
      max = i;
    }
    if ((right <= length - 1) && compareFunction(arr[offset + right], arr[offset + max]) > 0) {
      max = right;
    }

    if (max !== i) {
      swapFunction(arr, offset + i, offset + max);
      heapify(max);
    }
  }

  sort();
  // END HEAPSORT

  return arr;
}

export function shellsort(arr, options) {
  let offset = 0,
      length = arr.length - offset,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null,
      switchLimit = 0,
      switchFunction = insertionsort;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
  	if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
  	if (options.compareFunction !== undefined) compareFunction = options.compareFunction;
  	if (options.swapFunction !== undefined) swapFunction = options.swapFunction;
  	if (options.sortedCallbackFunction !== undefined) sortedCallbackFunction = options.sortedCallbackFunction;
  	if (options.switchLimit !== undefined) switchLimit = options.switchLimit;
  	if (options.switchFunction !== undefined) switchFunction = options.switchFunction;
  }

  // BEGIN SHELLSORT
  let gapDenominator = 2, gap = Math.floor(length / gapDenominator);
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
  if (switchLimit > 0) {
    switchFunction(arr, options);
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

export function selectionsort(arr, options) {
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

  // BEGIN SELECTIONSORT
  for (let i = offset; i < offset + length; i++) {
    let min = i;
    for (let k = i + 1; k < offset + length; k++) {
      if (compareFunction(arr[k], arr[min]) < 0) {
        min = k;
      }
    }
    if (min !== i) {
      swapFunction(arr, i, min);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(i, i + 1));
  }
  // END SELECTIONSORT

  return arr;
}

export function cocktailshakersort(arr, options) {
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

  // BEGIN COCKTAILSHAKERSORT
  let nRight = length;
  let nLeft = offset;
  do {
    let m = nLeft, swaps = false;
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
  } while (nRight != nLeft);
  // END COCKTAILSHAKERSORT

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
    let m = offset, swaps = false;
    for (let i = m + 1; i < n; i++) {
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
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(m, n));
    n = m;
  } while (n != 0);
  // END BUBBLESORT

  return arr;
}

export function bogosort(arr, options) {
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

export function bogobogosort(arr, options) {
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

  // BEGIN BOGOBOGOSORT
  function isArraySorted(end) {
    for (let i = offset + 1; i < offset + end + 1; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) return false;
    }
    return true;
  }

  function shuffle(end) {
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
    if (!isArraySorted(i)) {
      i = offset - 1;
    }
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END BOGOBOGOSORT

  return arr;
}
