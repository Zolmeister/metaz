# Metaz js
#### Node.js Metaprogramming library

`npm install metaz`


```js
// library.js
'use strict'
var metaz = require('metaz')

// Invalidate require cache on each require to get the parent again
delete require.cache[__filename]

var meta = metaz.getExports(module.parent, metaz.getSource(module.parent), './metalib')

// Do anything you want with the source,
// e.g. parse the AST for interesting content
var source = metaz.getSource(module.parent)

meta.source = function() {
  return source
}

meta.addOne = function() {
  return 100
}

// Overrides the module with your new exports
metaz.modifyExports(module.parent, meta)
```
