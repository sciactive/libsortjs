var LibSort =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * LibSort.js
 *
 * Version 0.0.1-dev
 * Apache 2.0 License
 * Copyright 2017 Hunter Perrin
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCompareFunction = defaultCompareFunction;
exports.defaultSwapFunction = defaultSwapFunction;
exports.defaultInsertFunction = defaultInsertFunction;
exports.zipsort = zipsort;
exports.quicksort = quicksort;
exports.mergesort = mergesort;
exports.heapsort = heapsort;
exports.shellsort = shellsort;
exports.insertionsort = insertionsort;
exports.selectionsort = selectionsort;
exports.cocktailshakersort = cocktailshakersort;
exports.bubblesort = bubblesort;
exports.bogosort = bogosort;
exports.bogobogosort = bogobogosort;
function defaultCompareFunction(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function defaultSwapFunction(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function defaultInsertFunction(arr, index, element) {
  arr[index] = element;
}

function zipsort(arr, options, recursing) {
  var offset = 0,
      length = arr.length - offset,
      denominator = 2,
      compareFunction = defaultCompareFunction,
      swapFunction = defaultSwapFunction,
      sortedCallbackFunction = null;
  if (typeof options === "function") {
    compareFunction = options;
  } else if (options !== undefined) {
    if (options.offset !== undefined) offset = options.offset;
    if (options.length !== undefined) length = options.length;
    if (options.denominator !== undefined) denominator = options.denominator;
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
  var swapped = void 0;
  var mid = Math.floor(length / 2);
  do {
    swapped = false;
    if (mid + 1 > 1) {
      swapped = zipsort(arr, { offset: offset, length: mid + 1, compareFunction: compareFunction, swapFunction: swapFunction, sortedCallbackFunction: sortedCallbackFunction }, true) && swapped;
    }
    if (length - mid > 1) {
      swapped = zipsort(arr, { offset: offset + mid, length: length - mid, compareFunction: compareFunction, swapFunction: swapFunction, sortedCallbackFunction: sortedCallbackFunction }, true) && swapped;
    }
    for (var i = 0; i <= mid; i++) {
      var iRight = mid - 1 + i;
      if (compareFunction(arr[offset + i], arr[offset + iRight]) > 0) {
        swapFunction(arr, offset + i, offset + iRight);
        swapped = true;
      }
    }
    for (var _i = 0; _i <= mid; _i++) {
      var _iRight = length - 1 - _i;
      if (_i > _iRight) break;
      if (_i === _iRight) _iRight++;
      if (compareFunction(arr[offset + _i], arr[offset + _iRight]) > 0) {
        swapFunction(arr, offset + _i, offset + _iRight);
        swapped = true;
      }
    }
    for (var _i2 = mid; _i2 >= 0; _i2--) {
      var _iRight2 = mid - 1 + _i2;
      if (compareFunction(arr[offset + _i2], arr[offset + _iRight2]) > 0) {
        swapFunction(arr, offset + _i2, offset + _iRight2);
        swapped = true;
      }
    }
  } while (swapped);
  if (!recursing && sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));

  if (recursing) return swapped;
  // END ZIPSORT

  return arr;
}

function quicksort(arr, options, recursing) {
  var offset = 0,
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
  var mIndex = offset + Math.floor(length / 2);
  var hIndex = mIndex + 1;
  var lIndex = mIndex - 1;
  var pivotIndex = offset + length - 1;
  var median = lIndex;
  if (length > 5) {
    // I don't move the other elements because it kills the algorithm on
    // reversed arrays.
    var lm = compareFunction(arr[lIndex], arr[mIndex]);
    var mh = compareFunction(arr[mIndex], arr[hIndex]);
    var lh = compareFunction(arr[lIndex], arr[hIndex]);
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
  var pivot = arr[pivotIndex];

  // Start from the points after where we've already checked looking for the
  // pivot.
  var curIndex = offset;
  var lastIndex = offset + length - 2;
  var everythingIsEqual = true;
  while (curIndex <= lastIndex) {
    // Compare the item with the pivot.
    var compare = compareFunction(arr[curIndex], pivot);
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
          var _compare = compareFunction(arr[lastIndex], pivot);
          if (_compare <= 0) {
            swapFunction(arr, curIndex, lastIndex);
            if (_compare < 0) curIndex++;
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
    var lengthSmallSide = curIndex - offset;
    if (maxDelta > -1 && lengthSmallSide > maxDelta + 1 || maxDelta === -1 && lengthSmallSide > switchLimit) {
      // We need to sort the small side of the list.
      if (lengthSmallSide > switchLimit) {
        quicksort(arr, { offset: offset, length: lengthSmallSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, sortedCallbackFunction: sortedCallbackFunction, switchLimit: switchLimit, switchFunction: switchFunction }, true);
      } else {
        switchFunction(arr, { offset: offset, length: lengthSmallSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, sortedCallbackFunction: sortedCallbackFunction });
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(offset, curIndex));
    }
    var lengthBigSide = offset + length - curIndex - 1;
    if (maxDelta > -1 && lengthBigSide > maxDelta + 1 || maxDelta === -1 && lengthBigSide > switchLimit) {
      // We need to sort the big side of the list.
      if (lengthBigSide > switchLimit) {
        quicksort(arr, { offset: curIndex + 1, length: lengthBigSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, sortedCallbackFunction: sortedCallbackFunction, switchLimit: switchLimit, switchFunction: switchFunction }, true);
      } else {
        switchFunction(arr, { offset: curIndex + 1, length: lengthBigSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, sortedCallbackFunction: sortedCallbackFunction });
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

function mergesort(arr, options, recursing) {
  var offset = 0,
      length = arr.length - offset,
      maxDelta = 0,
      // I think maxDelta here is working more like a "percentage off".
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
      var temp = arr[offset];
      insertFunction(arr, offset, arr[offset + 1]);
      insertFunction(arr, offset + 1, temp);
    }
    return arr;
  }
  var mid = Math.floor(length / 2);
  if (mid > maxDelta + 1) {
    mergesort(arr, { offset: offset, length: mid, maxDelta: maxDelta, compareFunction: compareFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction }, true);
  }
  if (length - mid > maxDelta + 1) {
    mergesort(arr, { offset: offset + mid, length: length - mid, maxDelta: maxDelta, compareFunction: compareFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction }, true);
  }
  var left = arr.slice(offset, offset + mid);
  var right = arr.slice(offset + mid, offset + length);
  var lIndex = 0,
      rIndex = 0,
      aIndex = 0;
  while (lIndex < left.length && rIndex < right.length) {
    var compare = compareFunction(left[lIndex], right[rIndex]);
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

function heapsort(arr, options) {
  var offset = 0,
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
    for (var i = length - 1; i > 0; i--) {
      swapFunction(arr, offset, offset + i);
      if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + i, offset + i + 1));
      length--;
      heapify(0);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + 1));
  }

  function buildMaxHeap() {
    for (var i = Math.floor((length - 1) / 2); i >= 0; i--) {
      heapify(i);
    }
  }

  function heapify(i) {
    var left = i * 2;
    var right = left + 1;
    var max = void 0;

    if (left <= length - 1 && compareFunction(arr[offset + left], arr[offset + i]) > 0) {
      max = left;
    } else {
      max = i;
    }
    if (right <= length - 1 && compareFunction(arr[offset + right], arr[offset + max]) > 0) {
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

function shellsort(arr, options) {
  var offset = 0,
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
  var gapDenominator = 2,
      gap = Math.floor(length / gapDenominator);
  while (gap > switchLimit) {
    for (var i = offset + gap; i < offset + length; i++) {
      var k = i;
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

function insertionsort(arr, options) {
  var offset = 0,
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
  for (var i = offset + 1; i < offset + length; i++) {
    var k = i;
    while (k > offset && compareFunction(arr[k - 1], arr[k]) > 0) {
      swapFunction(arr, k - 1, k);
      k--;
    }
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END INSERTIONSORT

  return arr;
}

function selectionsort(arr, options) {
  var offset = 0,
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
  for (var i = offset; i < offset + length; i++) {
    var min = i;
    for (var k = i + 1; k < offset + length; k++) {
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

function cocktailshakersort(arr, options) {
  var offset = 0,
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
  var nRight = length;
  var nLeft = offset;
  do {
    var m = nLeft,
        swaps = false;
    for (var i = m + 1; i < nRight; i++) {
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
    m = nRight - 1;swaps = false;
    for (var _i3 = m - 1; _i3 >= nLeft; _i3--) {
      if (compareFunction(arr[_i3], arr[_i3 + 1]) > 0) {
        swaps = true;
        swapFunction(arr, _i3, _i3 + 1);
        m = _i3;
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

function bubblesort(arr, options) {
  var offset = 0,
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
  var n = length;
  do {
    var m = offset,
        swaps = false;
    for (var i = m + 1; i < n; i++) {
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

function bogosort(arr, options) {
  var offset = 0,
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
    for (var i = offset + 1; i < offset + length; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) return false;
    }
    return true;
  }

  function shuffle() {
    var counter = length;
    // While there are elements in the array.
    while (counter > 0) {
      // Pick a random index.
      var index = offset + Math.floor(Math.random() * counter);
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

function bogobogosort(arr, options) {
  var offset = 0,
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
    for (var i = offset + 1; i < offset + end + 1; i++) {
      if (compareFunction(arr[i - 1], arr[i]) > 0) return false;
    }
    return true;
  }

  function shuffle(end) {
    var counter = end + 1;
    // While there are elements in the array.
    while (counter > 0) {
      // Pick a random index.
      var index = offset + Math.floor(Math.random() * counter);
      // Decrease counter by 1.
      counter--;
      // And swap the last element with it.
      if (offset + counter !== index) {
        swapFunction(arr, offset + counter, index);
      }
    }
  }

  for (var i = offset; i < offset + length; i++) {
    shuffle(i);
    if (!isArraySorted(i)) {
      i = offset - 1;
    }
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END BOGOBOGOSORT

  return arr;
}

/***/ })
/******/ ]);