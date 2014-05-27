'use strict'
var metaz = require('metaz')

// Invalidate require cache on each require to get the parent again
delete require.cache[__filename]

var meta = metaz.getParentExports(module.parent, './metalib')
var source = metaz.getSource(module.parent)

meta.source = function() {
  return source
}

meta.addOne = function() {
  return 100
}

metaz.modifyExports(module.parent, meta)
