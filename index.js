var exec = require('child_process').exec

function _command (cmd, cb) {
  exec(cmd, { cwd: exports.sourcedir }, function (err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
}

var exports = {
  sourcedir:__dirname,
  short : function (cb) { 
      _command('git rev-parse --short HEAD', cb)
    }
  , long : function (cb) { 
      _command('git rev-parse HEAD', cb)
    }
  , branch : function (cb) { 
      _command('git rev-parse --abbrev-ref HEAD', cb)
    }
  , tag : function (cb) { 
      _command('git describe --always --tag --abbrev=0', cb)
    }
  , log : function (cb) { 
      _command('git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit', function (str) {
        str = str.substr(0, str.length-1)
        cb(JSON.parse('[' + str + ']'))
      })
    }
  , count : function(cb){ 
    _command('git rev-list HEAD --count', function(count){
      cb(count);
    });
  }
}

module.exports = exports;
