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
  return {
    set: function (path, x, cb) {
      var target = obj;
      ps = path.split('.');
      for (var i = 0; i < ps.length - 1; i++) {
        target = target[ps[i]];
        target = target ? target : {};
      }
      var last = ps[ps.length - 1];
      target[last] = x;
      dal.el(last).innerHTML = x;
      if (cb) cb(null, path, x);
    }
  };
};

exports.bind = bind;
