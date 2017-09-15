'use strict'

const BinaryHeap = require('./minHeap');
const MinHeapNode = require('./heapNode');

module.exports = (logSources, printer) => {
	let minHeap = new BinaryHeap();

// take first object from log files and add to heap
// after insert min value will be on top of heap
	for(let i = 0; i < logSources.length; i++){
		let tmp = logSources[i].pop();
		let node = new MinHeapNode({
			value: tmp.date,
			idx: i,
			msg: tmp.msg
		});
		minHeap.insert(node);
	}

// continue do this while heap is not empty. remove mean element
// from heap and take next elemnt from the same log file.

	while (minHeap.heap.length > 0) {
		let node = minHeap.removeMin();
		printer.print({date: node.value, msg: node.msg});
		let tmp = logSources[node.idx].pop();

		if (tmp) {
			node = new MinHeapNode({
				value: tmp.date,
				idx: node.idx,
				msg: tmp.msg
			});
			minHeap.insert(node);
		}
	}
	printer.done();

}
