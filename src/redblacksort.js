'use strict';

import defaultCompareFunction from './defaultCompareFunction';
import defaultInsertFunction from './defaultInsertFunction';
import RedBlackTree from './RedBlackTree';

export default function redblacksort (
  arr,
  {
    offset = 0,
    length = arr.length - offset,
    compareFunction = defaultCompareFunction,
    insertFunction = defaultInsertFunction,
    sortedCallbackFunction = null
  }
) {
  if (length <= 1) {
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(offset, offset + length));
    return arr;
  }

  // BEGIN REDBLACKSORT
  // Build a Red-Black Tree out of the array slice.
  const tree = RedBlackTree.from(arr.slice(offset, offset + length), compareFunction);
  // Now go through the tree from left to right and insert the children.
  let node = tree.first();
  let i = offset;
  while (node) {
    insertFunction(arr, i, node.value);
    if (sortedCallbackFunction) sortedCallbackFunction(arr.slice(i, i + 1));
    i++;
    node = node.next();
  }
  // END REDBLACKSORT

  return arr;
}
