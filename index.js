'use strict'
/*eslint no-eval: 0, no-unused-vars: 0*/
var fs = require('fs')
module.exports = {
  getParentModule: getParentModule,
  getSource: getSource,
  modifyExports: modifyExports
}

function getParentModule(moduleParent, name) {
  var filePath = _getPath(moduleParent)
  var source = getSource(moduleParent)
  var excluded = _excludeRequire(source, name)
  var pathed = _requirePaths(source, filePath)

  return {
    source: source,
    exports: _evalSource(pathed).exports
  }
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

function _evalSource(source) {
  return (function () {
    var module = {
      exports: {}
    }

    var exports = module.exports

    eval(source)
    return module
  })()
}

/*

module.exports = Metaz
function Metaz(moduleParent, metaFlag) {
  this.moduleParent = moduleParent
  this.metaFlag = metaFlag == undefined ? metaFlag : true
}

Metaz.prototype.source =

Metaz.prototype.override = function override(source) {

}



function override(moduleParent, exports) {
    moduleParent.exports = exports
    return moduleParent
}

function updateExports() {
  return {test: 'test'}
}

function parentSource(moduleParent) {
  var source = fs.readFileSync(moduleParent.filename, 'utf-8')
  return source
}

function removeRequire(source, name) {
  var regexp = new RegExp('require\([\'"]' + name + '[\'"]\)')
  return source.replace(regexp, '{}')
}

function absoluteRequires(source, path) {
  return source.replace(/require\(['"](\..*)['"]\)/g, 'require(\'' + path + '$1\')')
}

function evalSource(source) {
  return (function () {
    var module = {
      exports: {}
    }

    var exports = module.exports

    eval(source)
    return module
  })()
}

module.exports = {
  parentSource: parentSource,
  removeRequire: removeRequire,
  absoluteRequires: absoluteRequires,
  evalSource: evalSource,
  updateExports: updateExports,
  override: override
}*/
