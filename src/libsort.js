/**
 * LibSort.js
 *
 * Version 0.0.0-dev
 * Apache 2.0 License
 * Copyright 2017 Hunter Perrin
 */

function defaultComparator(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function defaultSwapper(arr, index1, index2) {
	const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function quicksort(arr, comparator, swapper, offset, length) {
	if (!offset) offset = 0;
  if (!length) length = arr.length - offset;
	if (length == 1) return arr;
	if (!comparator) comparator = defaultComparator;
	if (!swapper) swapper = defaultSwapper;

  // Let's see if we just need to make one quick comparison.
  if (length === 2) {
  	if (comparator(arr[offset], arr[offset + 1]) === 1) {
    	// Our one element is bigger than its sibling, so swap them.
      swapper(arr, offset, offset + 1);
    }
    return arr;
  }

  let pivotIndex = offset + Math.floor(length / 2);
  const pivot = arr[pivotIndex];
  // Swap the pivot into the last position.
  swapper(arr, pivotIndex, offset + length - 1);

  let curIndex = offset;
  let lastIndex = offset + length - 2;
  let everythingIsEqual = true;
  while (curIndex <= lastIndex) {
  	// Compare the item with the pivot.
  	const compare = comparator(arr[curIndex], pivot);
    // Make sure the list is not just fully equal.
    if (compare !== 0) {
    	everythingIsEqual = false;
    }
    if (compare < 0) {
    	// If it is less than the pivot, it is where it belongs, so move forward.
    	curIndex++;
    } else if (compare >= 0) {
    	// If it is greater than or equal to the pivot, it needs to move to the end of the array, and the
      // one before that is our new last index.
      if (curIndex !== lastIndex) {
      	swapper(arr, curIndex, lastIndex);
      }
      lastIndex--;
    }
  }

  // Now everything at curIndex and onward is greater than or equal to our pivot, and everything
  // before curIndex is less than our pivot.

  // If everything is equal, then we're done.
  if (!everythingIsEqual) {
    // Let's see if we need to go deeper.
    if (curIndex - offset > 1) {
      // We need to sort the small side of the list.
      quicksort(arr, comparator, swapper, offset, curIndex - offset);
    }
    if (offset + length - curIndex > 1) {
      // We need to sort the big side of the list.
      quicksort(arr, comparator, swapper, curIndex, offset + length - curIndex);
    }
  }
  return arr;
}
