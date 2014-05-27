'use strict'
/*eslint no-eval: 0, no-unused-vars: 0*/
var fs = require('fs')
module.exports = {
  getExports: getExports,
  getSource: getSource,
  modifyExports: modifyExports,
  evaluate: evaluate
}

function getExports(moduleParent, source, name) {
  var filePath = _getPath(moduleParent)
  var excluded = _excludeRequire(source, name)
  var pathed = _requirePaths(source, filePath)

  return evaluate(pathed).exports
}

function getSource(moduleParent) {
  return fs.readFileSync(moduleParent.filename, 'utf-8')
}

function modifyExports(moduleParent, exports) {
  moduleParent.exports = exports
}

function _getPath(moduleParent) {
  return moduleParent.filename.replace(/[^\/]*$/, '')
}

function _excludeRequire(source, name) {
  var regexp = new RegExp('require\([\'"]' + name + '[\'"]\)')
  return source.replace(regexp, '{}')
}

function _requirePaths(source, filePath) {
  return source.replace(/require\(['"](\..*)['"]\)/g,
                        'require(\'' + filePath + '$1\')')
}

function evaluate(source) {
  return (function () {
    var module = {
      exports: {}
    }

    var exports = module.exports

    eval(source)
    return module
  })()
}
