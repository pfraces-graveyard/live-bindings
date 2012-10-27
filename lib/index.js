var traverse = require('traverse')
  , dal = require('dal');

var bind = function (obj) {
  traverse(obj).forEach(function (x) {
    if (this.isLeaf) dal.el(this.key).innerHTML = x;
  });
};

exports.bind = bind;
