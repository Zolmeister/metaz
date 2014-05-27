'use strict'
var metaz = require('metaz')

var meta = metaz.getParentModule(module.parent, './metalib')
var source = metaz.getSource(module.parent)

meta.exports.source = function() {
  return source
}

meta.exports.addOne = function() {
  return 100
}

metaz.modifyExports(module.parent, meta.exports)
