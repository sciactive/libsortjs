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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultCompareFunction;
function defaultCompareFunction(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultSwapFunction;
function defaultSwapFunction(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultInsertFunction;
function defaultInsertFunction(arr, index, element) {
  arr[index] = element;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bogobogosort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bogobogosort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bogosort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bogosort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bubblesort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bubblesort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cocktailshakersort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cocktailshakersort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = heapsort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function heapsort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertionsort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertionsort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergesort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultInsertFunction = __webpack_require__(2);

var _defaultInsertFunction2 = _interopRequireDefault(_defaultInsertFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergesort(arr, _ref, recursing) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$maxDelta = _ref.maxDelta,
      maxDelta = _ref$maxDelta === undefined ? 0 : _ref$maxDelta,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$insertFunction = _ref.insertFunction,
      insertFunction = _ref$insertFunction === undefined ? _defaultInsertFunction2.default : _ref$insertFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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
    if (left[lIndex] === undefined || right[rIndex] === undefined) {
      debugger;
    }
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oddevensort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function oddevensort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quicksort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

var _defaultInsertFunction = __webpack_require__(2);

var _defaultInsertFunction2 = _interopRequireDefault(_defaultInsertFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function quicksort(arr, _ref, recursing) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$maxDelta = _ref.maxDelta,
      maxDelta = _ref$maxDelta === undefined ? 0 : _ref$maxDelta,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$insertFunction = _ref.insertFunction,
      insertFunction = _ref$insertFunction === undefined ? _defaultInsertFunction2.default : _ref$insertFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu,
      _ref$switchLimit = _ref.switchLimit,
      switchLimit = _ref$switchLimit === undefined ? 0 : _ref$switchLimit,
      _ref$switchFunction = _ref.switchFunction,
      switchFunction = _ref$switchFunction === undefined ? null : _ref$switchFunction;

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = redblacksort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultInsertFunction = __webpack_require__(2);

var _defaultInsertFunction2 = _interopRequireDefault(_defaultInsertFunction);

var _RedBlackTree = __webpack_require__(15);

var _RedBlackTree2 = _interopRequireDefault(_RedBlackTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function redblacksort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$insertFunction = _ref.insertFunction,
      insertFunction = _ref$insertFunction === undefined ? _defaultInsertFunction2.default : _ref$insertFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

  if (length <= 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // BEGIN REDBLACKSORT
  // Build a Red-Black Tree out of the array slice.
  var tree = _RedBlackTree2.default.from(arr.slice(offset, offset + length), compareFunction);
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectionsort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectionsort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu;

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shellsort;

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

var _defaultSwapFunction = __webpack_require__(1);

var _defaultSwapFunction2 = _interopRequireDefault(_defaultSwapFunction);

var _defaultInsertFunction = __webpack_require__(2);

var _defaultInsertFunction2 = _interopRequireDefault(_defaultInsertFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shellsort(arr, _ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 0 : _ref$offset,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? arr.length - offset : _ref$length,
      _ref$compareFunction = _ref.compareFunction,
      compareFunction = _ref$compareFunction === undefined ? _defaultCompareFunction2.default : _ref$compareFunction,
      _ref$swapFunction = _ref.swapFunction,
      swapFunction = _ref$swapFunction === undefined ? _defaultSwapFunction2.default : _ref$swapFunction,
      _ref$insertFunction = _ref.insertFunction,
      insertFunction = _ref$insertFunction === undefined ? _defaultInsertFunction2.default : _ref$insertFunction,
      _ref$sortedCallbackFu = _ref.sortedCallbackFunction,
      sortedCallbackFunction = _ref$sortedCallbackFu === undefined ? null : _ref$sortedCallbackFu,
      _ref$switchLimit = _ref.switchLimit,
      switchLimit = _ref$switchLimit === undefined ? 0 : _ref$switchLimit,
      _ref$switchFunction = _ref.switchFunction,
      switchFunction = _ref$switchFunction === undefined ? null : _ref$switchFunction;

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RedBlackTreeNode = __webpack_require__(16);

var _RedBlackTreeNode2 = _interopRequireDefault(_RedBlackTreeNode);

var _defaultCompareFunction = __webpack_require__(0);

var _defaultCompareFunction2 = _interopRequireDefault(_defaultCompareFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedBlackTree = function () {
  function RedBlackTree(compareFunction) {
    _classCallCheck(this, RedBlackTree);

    this.root = null;
    this.compareFunction = compareFunction ? compareFunction : _defaultCompareFunction2.default;
  }

  _createClass(RedBlackTree, [{
    key: "insert",
    value: function insert(value) {
      if (!this.root) {
        return this.root = new _RedBlackTreeNode2.default({ value: value });
      }
      var current = this.root;
      var node = void 0;
      while (true) {
        if (this.compareFunction(value, current.value) < 0) {
          if (current.leftChild) {
            current = current.leftChild;
          } else {
            node = new _RedBlackTreeNode2.default({ value: value, parent: current, red: true });
            current.leftChild = node;
            break;
          }
        } else {
          if (current.rightChild) {
            current = current.rightChild;
          } else {
            node = new _RedBlackTreeNode2.default({ value: value, parent: current, red: true });
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

exports.default = RedBlackTree;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedBlackTreeNode = function () {
  function RedBlackTreeNode(_ref) {
    var value = _ref.value,
        parent = _ref.parent,
        leftChild = _ref.leftChild,
        rightChild = _ref.rightChild,
        red = _ref.red;

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

exports.default = RedBlackTreeNode;

/***/ }),
/* 17 */
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
exports.shellsort = exports.selectionsort = exports.redblacksort = exports.quicksort = exports.oddevensort = exports.mergesort = exports.insertionsort = exports.heapsort = exports.cocktailshakersort = exports.bubblesort = exports.bogosort = exports.bogobogosort = undefined;

var _bogobogosort = __webpack_require__(3);

var _bogobogosort2 = _interopRequireDefault(_bogobogosort);

var _bogosort = __webpack_require__(4);

var _bogosort2 = _interopRequireDefault(_bogosort);

var _bubblesort = __webpack_require__(5);

var _bubblesort2 = _interopRequireDefault(_bubblesort);

var _cocktailshakersort = __webpack_require__(6);

var _cocktailshakersort2 = _interopRequireDefault(_cocktailshakersort);

var _heapsort = __webpack_require__(7);

var _heapsort2 = _interopRequireDefault(_heapsort);

var _insertionsort = __webpack_require__(8);

var _insertionsort2 = _interopRequireDefault(_insertionsort);

var _mergesort = __webpack_require__(9);

var _mergesort2 = _interopRequireDefault(_mergesort);

var _oddevensort = __webpack_require__(10);

var _oddevensort2 = _interopRequireDefault(_oddevensort);

var _quicksort = __webpack_require__(11);

var _quicksort2 = _interopRequireDefault(_quicksort);

var _redblacksort = __webpack_require__(12);

var _redblacksort2 = _interopRequireDefault(_redblacksort);

var _selectionsort = __webpack_require__(13);

var _selectionsort2 = _interopRequireDefault(_selectionsort);

var _shellsort = __webpack_require__(14);

var _shellsort2 = _interopRequireDefault(_shellsort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _quicksort2.default;
exports.bogobogosort = _bogobogosort2.default;
exports.bogosort = _bogosort2.default;
exports.bubblesort = _bubblesort2.default;
exports.cocktailshakersort = _cocktailshakersort2.default;
exports.heapsort = _heapsort2.default;
exports.insertionsort = _insertionsort2.default;
exports.mergesort = _mergesort2.default;
exports.oddevensort = _oddevensort2.default;
exports.quicksort = _quicksort2.default;
exports.redblacksort = _redblacksort2.default;
exports.selectionsort = _selectionsort2.default;
exports.shellsort = _shellsort2.default;

/***/ })
/******/ ]);