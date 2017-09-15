'use strict'

module.exports = class BinaryHeap {
  constructor() {
    this.heap = [];
  }

  getParrentIndex(chIndex) {
    return Math.floor((chIndex - 1) / 2);
  }

  getLeftChild(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChild(parentIndex) {
    return parentIndex * 2 + 2;
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1, node);
  }

  bubbleUp(chIndex, childNode) {
    if (chIndex > 0) {
      const parrentIndex = this.getParrentIndex(chIndex);
      const parentNode = this.heap[parrentIndex];

      if (parentNode.value > childNode.value) {
        this.heap[parrentIndex] = childNode;
        this.heap[chIndex] = parentNode;

        this.bubbleUp(parrentIndex, childNode);
      }
    }
  }


  bubbleDown(parentIndex, parentData) {
    if (parentIndex < this.heap.length) {
      let targetIndex = parentIndex;
      let targetData = parentData;

      const leftChildIndex = this.getLeftChild(parentIndex);
      const rightChildIndex = this.getRightChild(parentIndex);


      let swap = (index, heap) => {
        if (index < heap.length) {
          const data = heap[index];

          if (data.value < targetData.value) {
            targetIndex = index;
            targetData = data;
          }
        }
      }

      swap(leftChildIndex, this.heap);
      swap(rightChildIndex, this.heap);

      if (targetIndex !== parentIndex) {
        this.heap[parentIndex] = targetData;
        this.heap[targetIndex] = parentData;
        this.bubbleDown(targetIndex, parentData);
      }
    }
  }

  removeMin() {
    const headNode = this.heap[0];
    const tailNode = this.heap.pop();

    if (this.heap.length) {
      this.heap[0] = tailNode;
      this.bubbleDown(0, tailNode);
    }

    return headNode;
  }
}
