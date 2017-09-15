'use strict'

module.exports = class MinHeapNode {
  constructor(args) {
    this.value = args.value;
    this.msg = args.msg;
    this.idx = args.idx;
  }
}
