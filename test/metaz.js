'use strict'
/*globals describe, it*/
var chai = require('chai')
var expect = chai.expect

var testModule = require('./testModule')

describe('Metaz', function () {
  it('metalizes', function () {
    expect(testModule.addOne(3)).to.equal(100)
    expect(testModule.source().length).not.to.equal(0)
  })
})
