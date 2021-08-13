'use strict';

import RedBlackTreeNode from './RedBlackTreeNode';
import defaultCompareFunction from './defaultCompareFunction';

export default class RedBlackTree {
  constructor (compareFunction) {
    this.root = null;
    this.compareFunction = compareFunction || defaultCompareFunction;
  }

  static from (arr, compareFunction) {
    const tree = new RedBlackTree(compareFunction);
    for (let i = 0; i < arr.length; i++) {
      tree.insert(arr[i]);
    }
    return tree;
  }

  insert (value) {
    if (!this.root) {
      this.root = new RedBlackTreeNode({value});
      return this.root;
    }
    let current = this.root;
    let node;
    while (true) {
      if (this.compareFunction(value, current.value) < 0) {
        if (current.leftChild) {
          current = current.leftChild;
        } else {
          node = new RedBlackTreeNode({value, parent: current, red: true});
          current.leftChild = node;
          break;
        }
      } else {
        if (current.rightChild) {
          current = current.rightChild;
        } else {
          node = new RedBlackTreeNode({value, parent: current, red: true});
          current.rightChild = node;
          break;
        }
      }
    }
    this.repaint(node);
    return node;
  }

  repaint (target) {
    let node = target;
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
            if (this.root === node.grandparent) this.root = node.grandparent.leftChild;
            node.grandparent.rotateRight();
          } else {
            if (this.root === node.grandparent) this.root = node.grandparent.rightChild;
            node.grandparent.rotateLeft();
          }
        }
      }
    }
  }

  first () {
    if (!this.root) return undefined;
    return this.root.leftMost();
  }
}
