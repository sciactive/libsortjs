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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.defaultCompareFunction = defaultCompareFunction;
exports.defaultSwapFunction = defaultSwapFunction;
exports.defaultInsertFunction = defaultInsertFunction;
exports.quicksort = quicksort;
exports.mergesort = mergesort;
exports.heapsort = heapsort;
exports.redblacksort = redblacksort;
exports.shellsort = shellsort;
exports.selectionsort = selectionsort;
exports.insertionsort = insertionsort;
exports.oddevensort = oddevensort;
exports.cocktailshakersort = cocktailshakersort;
exports.bubblesort = bubblesort;
exports.bogosort = bogosort;
exports.bogobogosort = bogobogosort;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function quicksort(arr, _ref, recursing) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$maxDelta = _ref.maxDelta,
      maxDelta = _ref$maxDelta === undefined ? 0 : _ref$maxDelta,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? defaultCompareFunction : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? defaultSwapFunction : _ref$swapFunction,
      _ref$insertFunction = _ref.insertFunction,
      insertFunction = _ref$insertFunction === undefined ? defaultInsertFunction : _ref$insertFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu,
      _ref$switchLimit = _ref.switchLimit,
      switchLimit = _ref$switchLimit === undefined ? 0 : _ref$switchLimit,
      _ref$switchFunction = _ref.switchFunction,
      switchFunction = _ref$switchFunction === undefined ? insertionsort : _ref$switchFunction;

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
          // Make sure the list is not just fully equal.
          if (_compare !== 0) {
            everythingIsEqual = false;
          }
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
  if (everythingIsEqual) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  } else {
    // Let's see if we need to go deeper.
    var lengthSmallSide = curIndex - offset;
    if (maxDelta > -1 && lengthSmallSide > maxDelta + 1 || maxDelta === -1 && lengthSmallSide > switchLimit) {
      // We need to sort the small side of the list.
      if (lengthSmallSide > switchLimit) {
        quicksort(arr, { offset: offset, length: lengthSmallSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction, switchLimit: switchLimit, switchFunction: switchFunction }, true);
      } else {
        switchFunction(arr, { offset: offset, length: lengthSmallSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction });
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(offset, curIndex));
    }
    var lengthBigSide = offset + length - curIndex - 1;
    if (maxDelta > -1 && lengthBigSide > maxDelta + 1 || maxDelta === -1 && lengthBigSide > switchLimit) {
      // We need to sort the big side of the list.
      if (lengthBigSide > switchLimit) {
        quicksort(arr, { offset: curIndex + 1, length: lengthBigSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction, switchLimit: switchLimit, switchFunction: switchFunction }, true);
      } else {
        switchFunction(arr, { offset: curIndex + 1, length: lengthBigSide, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction });
      }
    } else if (maxDelta > -1 && sortedCallbackFunction) {
      sortedCallbackFunction(arr.slice(curIndex + 1, offset + length));
    }
  }

  if (!recursing && maxDelta === -1) {
    switchFunction(arr, { offset: offset, length: length, maxDelta: maxDelta, compareFunction: compareFunction, swapFunction: swapFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction });
  }

  // END QUICKSORT

  return arr;
}

function mergesort(arr, _ref2, recursing) {
  var _ref2$offset = _ref2.offset,
      offset = _ref2$offset === undefined ? 0 : _ref2$offset,
      _ref2$length = _ref2.length,
      length = _ref2$length === undefined ? arr.length - offset : _ref2$length,
      _ref2$maxDelta = _ref2.maxDelta,
      maxDelta = _ref2$maxDelta === undefined ? 0 : _ref2$maxDelta,
      _ref2$compareFunction = _ref2.compareFunction,
      compareFunction = _ref2$compareFunction === undefined ? defaultCompareFunction : _ref2$compareFunction,
      _ref2$insertFunction = _ref2.insertFunction,
      insertFunction = _ref2$insertFunction === undefined ? defaultInsertFunction : _ref2$insertFunction,
      _ref2$sortedCallbackF = _ref2.sortedCallbackFunction,
      sortedCallbackFunction = _ref2$sortedCallbackF === undefined ? null : _ref2$sortedCallbackF;

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

function heapsort(arr, _ref3) {
  var _ref3$offset = _ref3.offset,
      offset = _ref3$offset === undefined ? 0 : _ref3$offset,
      _ref3$length = _ref3.length,
      length = _ref3$length === undefined ? arr.length - offset : _ref3$length,
      _ref3$compareFunction = _ref3.compareFunction,
      compareFunction = _ref3$compareFunction === undefined ? defaultCompareFunction : _ref3$compareFunction,
      _ref3$swapFunction = _ref3.swapFunction,
      swapFunction = _ref3$swapFunction === undefined ? defaultSwapFunction : _ref3$swapFunction,
      _ref3$sortedCallbackF = _ref3.sortedCallbackFunction,
      sortedCallbackFunction = _ref3$sortedCallbackF === undefined ? null : _ref3$sortedCallbackF;

  // BEGIN HEAPSORT
  function sort() {
    buildMaxHeap();
    for (var i = length - 1; i >= 0; i--) {
      if (offset !== offset + i) swapFunction(arr, offset, offset + i);
      if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset + i, offset + i + 1));
      length--;
      heapify(1);
    }
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + 1));
  }

  function buildMaxHeap() {
    for (var i = Math.floor(length / 2); i >= 0; i--) {
      heapify(i + 1);
    }
  }

  function heapify(i) {
    // This functions needs to act like the array is 1 indexed.
    var left = i * 2;
    var right = left + 1;
    var max = void 0;

    if (left <= length && compareFunction(arr[offset + left - 1], arr[offset + i - 1]) > 0) {
      max = left;
    } else {
      max = i;
    }
    if (right <= length && compareFunction(arr[offset + right - 1], arr[offset + max - 1]) > 0) {
      max = right;
    }

    if (max !== i) {
      swapFunction(arr, offset + i - 1, offset + max - 1);
      heapify(max);
    }
  }

  sort();
  // END HEAPSORT

  return arr;
}

function redblacksort(arr, _ref4) {
  var _ref4$offset = _ref4.offset,
      offset = _ref4$offset === undefined ? 0 : _ref4$offset,
      _ref4$length = _ref4.length,
      length = _ref4$length === undefined ? arr.length - offset : _ref4$length,
      _ref4$compareFunction = _ref4.compareFunction,
      compareFunction = _ref4$compareFunction === undefined ? defaultCompareFunction : _ref4$compareFunction,
      _ref4$insertFunction = _ref4.insertFunction,
      insertFunction = _ref4$insertFunction === undefined ? defaultInsertFunction : _ref4$insertFunction,
      _ref4$sortedCallbackF = _ref4.sortedCallbackFunction,
      sortedCallbackFunction = _ref4$sortedCallbackF === undefined ? null : _ref4$sortedCallbackF;

  if (length <= 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // BEGIN REDBLACKSORT
  // Build a Red-Black Tree out of the array slice.
  var tree = RedBlackTree.from(arr.slice(offset, offset + length), compareFunction);
  // Now go through the tree from left to right and insert the children.
  var node = tree.first(),
      i = offset;
  while (node) {
    insertFunction(arr, i, node.value);
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(i, i + 1));
    i++;
    node = node.next();
  }
  // END REDBLACKSORT

  return arr;
}

function shellsort(arr, _ref5) {
  var _ref5$offset = _ref5.offset,
      offset = _ref5$offset === undefined ? 0 : _ref5$offset,
      _ref5$length = _ref5.length,
      length = _ref5$length === undefined ? arr.length - offset : _ref5$length,
      _ref5$compareFunction = _ref5.compareFunction,
      compareFunction = _ref5$compareFunction === undefined ? defaultCompareFunction : _ref5$compareFunction,
      _ref5$swapFunction = _ref5.swapFunction,
      swapFunction = _ref5$swapFunction === undefined ? defaultSwapFunction : _ref5$swapFunction,
      _ref5$insertFunction = _ref5.insertFunction,
      insertFunction = _ref5$insertFunction === undefined ? defaultInsertFunction : _ref5$insertFunction,
      _ref5$sortedCallbackF = _ref5.sortedCallbackFunction,
      sortedCallbackFunction = _ref5$sortedCallbackF === undefined ? null : _ref5$sortedCallbackF,
      _ref5$switchLimit = _ref5.switchLimit,
      switchLimit = _ref5$switchLimit === undefined ? 0 : _ref5$switchLimit,
      _ref5$switchFunction = _ref5.switchFunction,
      switchFunction = _ref5$switchFunction === undefined ? insertionsort : _ref5$switchFunction;

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
    switchFunction(arr, { offset: offset, length: length, compareFunction: compareFunction, swapFunction: swapFunction, insertFunction: insertFunction, sortedCallbackFunction: sortedCallbackFunction, switchLimit: switchLimit, switchFunction: switchFunction });
  }
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END SHELLSORT

  return arr;
}

function selectionsort(arr, _ref6) {
  var _ref6$offset = _ref6.offset,
      offset = _ref6$offset === undefined ? 0 : _ref6$offset,
      _ref6$length = _ref6.length,
      length = _ref6$length === undefined ? arr.length - offset : _ref6$length,
      _ref6$compareFunction = _ref6.compareFunction,
      compareFunction = _ref6$compareFunction === undefined ? defaultCompareFunction : _ref6$compareFunction,
      _ref6$swapFunction = _ref6.swapFunction,
      swapFunction = _ref6$swapFunction === undefined ? defaultSwapFunction : _ref6$swapFunction,
      _ref6$sortedCallbackF = _ref6.sortedCallbackFunction,
      sortedCallbackFunction = _ref6$sortedCallbackF === undefined ? null : _ref6$sortedCallbackF;

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

function insertionsort(arr, _ref7) {
  var _ref7$offset = _ref7.offset,
      offset = _ref7$offset === undefined ? 0 : _ref7$offset,
      _ref7$length = _ref7.length,
      length = _ref7$length === undefined ? arr.length - offset : _ref7$length,
      _ref7$compareFunction = _ref7.compareFunction,
      compareFunction = _ref7$compareFunction === undefined ? defaultCompareFunction : _ref7$compareFunction,
      _ref7$swapFunction = _ref7.swapFunction,
      swapFunction = _ref7$swapFunction === undefined ? defaultSwapFunction : _ref7$swapFunction,
      _ref7$sortedCallbackF = _ref7.sortedCallbackFunction,
      sortedCallbackFunction = _ref7$sortedCallbackF === undefined ? null : _ref7$sortedCallbackF;

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

function oddevensort(arr, _ref8) {
  var _ref8$offset = _ref8.offset,
      offset = _ref8$offset === undefined ? 0 : _ref8$offset,
      _ref8$length = _ref8.length,
      length = _ref8$length === undefined ? arr.length - offset : _ref8$length,
      _ref8$compareFunction = _ref8.compareFunction,
      compareFunction = _ref8$compareFunction === undefined ? defaultCompareFunction : _ref8$compareFunction,
      _ref8$swapFunction = _ref8.swapFunction,
      swapFunction = _ref8$swapFunction === undefined ? defaultSwapFunction : _ref8$swapFunction,
      _ref8$sortedCallbackF = _ref8.sortedCallbackFunction,
      sortedCallbackFunction = _ref8$sortedCallbackF === undefined ? null : _ref8$sortedCallbackF;

  // BEGIN ODDEVENSORT
  var i = 0,
      swaps = false;
  do {
    if (i % 2) swaps = false;
    for (; i + 1 < length; i += 2) {
      if (compareFunction(arr[offset + i], arr[offset + i + 1]) > 0) {
        swaps = true;
        swapFunction(arr, offset + i, offset + i + 1);
      }
    }
    i = (i + 1) % 2;
  } while (swaps || !(i % 2));
  if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
  // END ODDEVENSORT

  return arr;
}

function cocktailshakersort(arr, _ref9) {
  var _ref9$offset = _ref9.offset,
      offset = _ref9$offset === undefined ? 0 : _ref9$offset,
      _ref9$length = _ref9.length,
      length = _ref9$length === undefined ? arr.length - offset : _ref9$length,
      _ref9$compareFunction = _ref9.compareFunction,
      compareFunction = _ref9$compareFunction === undefined ? defaultCompareFunction : _ref9$compareFunction,
      _ref9$swapFunction = _ref9.swapFunction,
      swapFunction = _ref9$swapFunction === undefined ? defaultSwapFunction : _ref9$swapFunction,
      _ref9$sortedCallbackF = _ref9.sortedCallbackFunction,
      sortedCallbackFunction = _ref9$sortedCallbackF === undefined ? null : _ref9$sortedCallbackF;

  // BEGIN COCKTAILSHAKERSORT
  var nRight = offset + length;
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
    for (var _i = m - 1; _i >= nLeft; _i--) {
      if (compareFunction(arr[_i], arr[_i + 1]) > 0) {
        swaps = true;
        swapFunction(arr, _i, _i + 1);
        m = _i;
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

function bubblesort(arr, _ref10) {
  var _ref10$offset = _ref10.offset,
      offset = _ref10$offset === undefined ? 0 : _ref10$offset,
      _ref10$length = _ref10.length,
      length = _ref10$length === undefined ? arr.length - offset : _ref10$length,
      _ref10$compareFunctio = _ref10.compareFunction,
      compareFunction = _ref10$compareFunctio === undefined ? defaultCompareFunction : _ref10$compareFunctio,
      _ref10$swapFunction = _ref10.swapFunction,
      swapFunction = _ref10$swapFunction === undefined ? defaultSwapFunction : _ref10$swapFunction,
      _ref10$sortedCallback = _ref10.sortedCallbackFunction,
      sortedCallbackFunction = _ref10$sortedCallback === undefined ? null : _ref10$sortedCallback;

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

function bogosort(arr, _ref11) {
  var _ref11$offset = _ref11.offset,
      offset = _ref11$offset === undefined ? 0 : _ref11$offset,
      _ref11$length = _ref11.length,
      length = _ref11$length === undefined ? arr.length - offset : _ref11$length,
      _ref11$compareFunctio = _ref11.compareFunction,
      compareFunction = _ref11$compareFunctio === undefined ? defaultCompareFunction : _ref11$compareFunctio,
      _ref11$swapFunction = _ref11.swapFunction,
      swapFunction = _ref11$swapFunction === undefined ? defaultSwapFunction : _ref11$swapFunction,
      _ref11$sortedCallback = _ref11.sortedCallbackFunction,
      sortedCallbackFunction = _ref11$sortedCallback === undefined ? null : _ref11$sortedCallback;

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

function bogobogosort(arr, _ref12) {
  var _ref12$offset = _ref12.offset,
      offset = _ref12$offset === undefined ? 0 : _ref12$offset,
      _ref12$length = _ref12.length,
      length = _ref12$length === undefined ? arr.length - offset : _ref12$length,
      _ref12$compareFunctio = _ref12.compareFunction,
      compareFunction = _ref12$compareFunctio === undefined ? defaultCompareFunction : _ref12$compareFunctio,
      _ref12$swapFunction = _ref12.swapFunction,
      swapFunction = _ref12$swapFunction === undefined ? defaultSwapFunction : _ref12$swapFunction,
      _ref12$sortedCallback = _ref12.sortedCallbackFunction,
      sortedCallbackFunction = _ref12$sortedCallback === undefined ? null : _ref12$sortedCallback;

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

var RedBlackTree = exports.RedBlackTree = function () {
  function RedBlackTree(compareFunction) {
    _classCallCheck(this, RedBlackTree);

    this.root = null;
    this.compareFunction = compareFunction ? compareFunction : defaultCompareFunction;
  }

  _createClass(RedBlackTree, [{
    key: "insert",
    value: function insert(value) {
      if (!this.root) {
        return this.root = new RedBlackTreeNode({ value: value });
      }
      var current = this.root;
      var node = void 0;
      while (true) {
        if (this.compareFunction(value, current.value) < 0) {
          if (current.leftChild) {
            current = current.leftChild;
          } else {
            node = new RedBlackTreeNode({ value: value, parent: current, red: true });
            current.leftChild = node;
            break;
          }
        } else {
          if (current.rightChild) {
            current = current.rightChild;
          } else {
            node = new RedBlackTreeNode({ value: value, parent: current, red: true });
            current.rightChild = node;
            break;
          }
        }
      }
      this.repaint(node);
      return node;
    }
  }, {
    key: "repaint",
    value: function repaint(target) {
      var node = target;
      if (!node.parent) {
        node.setBlack();
        return;
      }
      if (node.parent.isRed()) {
        if (node.uncle && node.uncle.isRed()) {
          node.parent.setBlack();
          node.uncle.setBlack();
          node.grandparent.setRed();
          this.repaint(node.grandparent);
        } else {
          if (node.grandparent && node === node.parent.leftChild && node.parent === node.grandparent.rightChild) {
            node.parent.rotateRight();
            node = node.rightChild;
          } else if (node.grandparent && node === node.parent.rightChild && node.parent === node.grandparent.leftChild) {
            node.parent.rotateLeft();
            node = node.leftChild;
          }
          node.parent.setBlack();
          if (node.grandparent) {
            node.grandparent.setRed();
            if (node === node.parent.leftChild) {
              if (this.root === node.grandparent) {
                this.root = node.grandparent.leftChild;
              }
              node.grandparent.rotateRight();
            } else {
              if (this.root === node.grandparent) {
                this.root = node.grandparent.rightChild;
              }
              node.grandparent.rotateLeft();
            }
          }
        }
      }
    }
  }, {
    key: "first",
    value: function first() {
      if (!this.root) return undefined;
      return this.root.leftMost();
    }
  }], [{
    key: "from",
    value: function from(arr, compareFunction) {
      var tree = new RedBlackTree(compareFunction);
      for (var i = 0; i < arr.length; i++) {
        tree.insert(arr[i]);
      }
      return tree;
    }
  }]);

  return RedBlackTree;
}();

var RedBlackTreeNode = exports.RedBlackTreeNode = function () {
  function RedBlackTreeNode(_ref13) {
    var value = _ref13.value,
        parent = _ref13.parent,
        leftChild = _ref13.leftChild,
        rightChild = _ref13.rightChild,
        red = _ref13.red;

    _classCallCheck(this, RedBlackTreeNode);

    this.value = value;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.red = !!red;
  }

  _createClass(RedBlackTreeNode, [{
    key: "rotateLeft",
    value: function rotateLeft() {
      var parent = this.parent,
          right = this.rightChild;
      if (!right) return;
      if (parent) {
        if (parent.rightChild === this) {
          parent.rightChild = right;
        } else {
          parent.leftChild = right;
        }
      }
      this.rightChild = right.leftChild;
      right.leftChild = this;
      this.parent = right;
      right.parent = parent;
      if (this.rightChild) {
        this.rightChild.parent = this;
      }
    }
  }, {
    key: "rotateRight",
    value: function rotateRight() {
      var parent = this.parent,
          left = this.leftChild;
      if (!left) return;
      if (parent) {
        if (parent.leftChild === this) {
          parent.leftChild = left;
        } else {
          parent.rightChild = left;
        }
      }
      this.leftChild = left.rightChild;
      left.rightChild = this;
      this.parent = left;
      left.parent = parent;
      if (this.leftChild) {
        this.leftChild.parent = this;
      }
    }
  }, {
    key: "setRed",
    value: function setRed() {
      this.red = true;
    }
  }, {
    key: "setBlack",
    value: function setBlack() {
      this.red = false;
    }
  }, {
    key: "isRoot",
    value: function isRoot() {
      return !this.parent;
    }
  }, {
    key: "isRed",
    value: function isRed() {
      return this.red;
    }
  }, {
    key: "isBlack",
    value: function isBlack() {
      return !this.red;
    }
  }, {
    key: "leftMost",
    value: function leftMost() {
      var node = this;
      while (node.leftChild) {
        node = node.leftChild;
      }
      return node;
    }
  }, {
    key: "rightMost",
    value: function rightMost() {
      var node = this;
      while (node.rightChild) {
        node = node.rightChild;
      }
      return node;
    }
  }, {
    key: "next",
    value: function next() {
      if (this.rightChild) {
        return this.rightChild.leftMost();
      } else {
        var node = this;
        while (node.parent && node === node.parent.rightChild) {
          node = node.parent;
        }
        return node.parent;
      }
    }
  }, {
    key: "grandparent",
    get: function get() {
      return this.parent ? this.parent.parent : undefined;
    }
  }, {
    key: "uncle",
    get: function get() {
      var grandparent = this.grandparent;
      if (!grandparent) return undefined;
      if (grandparent.leftChild === this.parent) {
        return grandparent.rightChild;
      } else {
        return grandparent.leftChild;
      }
    }
  }]);

  return RedBlackTreeNode;
}();

/***/ })
/******/ ]);