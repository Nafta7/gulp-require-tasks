function tree(tasks) {
  return Object.keys(tasks)
  .reduce(function(prev, task) {
    prev.nodes.push({
      label: task,
      nodes: Object.keys(tasks[task]).map(function(x){ return x; })
    });
    return prev;
  }, {
    nodes: [],
  });
}

module.exports = tree;
