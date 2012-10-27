var traverse = require('traverse')
  , dal = require('dal');

var bind = function (obj) {
  traverse(obj).forEach(function (x) {
    var that = this
      , key = that.key;

    if (Array.isArray(this.node)) {
      var children = dal.el(key).childNodes;

      for (var i = 0; i < children.length; i++) {
        dal.el(children[i].id).hide(); 
      }

      that.pre(function (item, index) {
        for (var i in item) (function () {
          var newitem = document.createElement('li');
          newitem.id = i + index;
          dal.el(key).appendChild(newitem);
          item[i + index] = item[i];
          delete item[i];
        })();
      });
    } else if (that.isLeaf) dal.el(key).innerHTML = x;
  });
};

exports.bind = bind;
