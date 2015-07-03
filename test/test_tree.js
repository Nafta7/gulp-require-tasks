var gulp = require('gulp');
var toska = require('..');
var opts = {path: {}, plugins: {}};

exports.testTree = {
  'should match a valid tree': function(test){
    var treefy = require('../lib/treefy');
    var archy = require('archy');
    var tasks = toska.reflect('mix');
    var tree = archy(treefy(tasks));
    
    var expectedTree = "├── a" + "├─┬ root" + "│ ├── a" + "│ └── b" + "├── b" +
      "├── c" + "├── d" + "├── e" + "└─┬ build" +"  ├──c" + "  ├──d" + "└──e";
    tree = tree.replace(/\s/g, '');
    expectedTree = expectedTree.replace(/\s/g, '');

    test.deepEqual(tree, expectedTree);
    test.done();
  }
};
