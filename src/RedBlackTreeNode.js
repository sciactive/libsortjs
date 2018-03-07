"use strict";

export default class RedBlackTreeNode {
  constructor({value, parent, leftChild, rightChild, red}) {
    this.value = value;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.red = !!red;
  }

  rotateLeft() {
    const parent = this.parent, right = this.rightChild;
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

  rotateRight() {
    const parent = this.parent, left = this.leftChild;
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

  setRed() {
    this.red = true;
  }

  setBlack() {
    this.red = false;
  }

  isRoot() {
    return !this.parent;
  }

  isRed() {
    return this.red;
  }

  isBlack() {
    return !this.red;
  }

  get grandparent() {
    return this.parent ? this.parent.parent : undefined;
  }

  get uncle() {
    const grandparent = this.grandparent;
    if (!grandparent) return undefined;
    if (grandparent.leftChild === this.parent) {
      return grandparent.rightChild;
    } else {
      return grandparent.leftChild;
    }
  }

  leftMost() {
    let node = this;
    while (node.leftChild) {
      node = node.leftChild;
    }
    return node;
  }

  rightMost() {
    let node = this;
    while (node.rightChild) {
      node = node.rightChild;
    }
    return node;
  }

  next() {
    if (this.rightChild) {
      return this.rightChild.leftMost();
    } else {
      let node = this;
      while (node.parent && node === node.parent.rightChild) {
        node = node.parent;
      }
      return node.parent;
    }
  }
}
