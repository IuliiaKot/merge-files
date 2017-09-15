'use strict'

const BinaryHeap = require('./minHeap');
const MinHeapNode = require('./heapNode');


module.exports = async (logSources, printer) => {
	// throw new Error('Not implemented yet!  That part is up to you!')
  let minHeap = new BinaryHeap();
  let res = [];

  for(let i = 0; i < logSources.length; i++){
    res.push(logSources[i].popAsync())
  }
  await Promise.all(res).then(elm => {
    for(let i = 0; i < elm.length; i ++){
      let node = new MinHeapNode({value: elm[i].date, idx: i, msg: elm[i].msg})
      minHeap.insert(node)
    }
  })

  while (minHeap.heap.length > 0) {
    let node = minHeap.removeMin();
    printer.print({date: node.value, msg: node.msg})
    let tmp = await logSources[node.idx].popAsync();
    if (tmp) {
      node = new MinHeapNode({value: tmp.date, idx: node.idx, msg: tmp.msg})
      minHeap.insert(node)
    }
  }
  	printer.done();

}
