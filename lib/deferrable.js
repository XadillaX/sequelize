'use strict';

var util = require('util')

function ABSTRACT () {}

ABSTRACT.prototype.toString = function () {
  return this.toSql.apply(this, arguments);
}

function INITIALLY_DEFERRED () {
  if (!(this instanceof INITIALLY_DEFERRED)) {
    return new INITIALLY_DEFERRED();
  }
}
util.inherits(INITIALLY_DEFERRED, ABSTRACT);

INITIALLY_DEFERRED.prototype.toSql = function () {
  return 'DEFERRABLE INITIALLY DEFERRED'
};

function INITIALLY_IMMEDIATE () {
  if (!(this instanceof INITIALLY_IMMEDIATE)) {
    return new INITIALLY_IMMEDIATE();
  }
}
util.inherits(INITIALLY_IMMEDIATE, ABSTRACT);

INITIALLY_IMMEDIATE.prototype.toSql = function () {
  return 'DEFERRABLE INITIALLY IMMEDIATE';
};

function NOT () {
  if (!(this instanceof NOT)) {
    return new NOT();
  }
}
util.inherits(NOT, ABSTRACT);

NOT.prototype.toSql = function () {
  return 'NOT DEFERRABLE';
};

function SET_DEFERRED (constraints) {
  if (!(this instanceof SET_DEFERRED)) {
    return new SET_DEFERRED(constraints);
  }

  this.constraints = constraints;
}
util.inherits(SET_DEFERRED, ABSTRACT);

SET_DEFERRED.prototype.toSql = function (queryGenerator) {
  return queryGenerator.setDeferredQuery(this.constraints);
};

function SET_IMMEDIATE (constraints) {
  if (!(this instanceof SET_IMMEDIATE)) {
    return new SET_IMMEDIATE(constraints);
  }

  this.constraints = constraints;
}
util.inherits(SET_IMMEDIATE, ABSTRACT);

SET_IMMEDIATE.prototype.toSql = function (queryGenerator) {
  return queryGenerator.setImmediateQuery(this.constraints);
};

var Deferrable = module.exports = {
  INITIALLY_DEFERRED: INITIALLY_DEFERRED,
  INITIALLY_IMMEDIATE: INITIALLY_IMMEDIATE,
  NOT: NOT,
  SET_DEFERRED: SET_DEFERRED,
  SET_IMMEDIATE: SET_IMMEDIATE
};

Object.keys(Deferrable).forEach(function (key) {
  var DeferrableType = Deferrable[key];

  DeferrableType.toString = function () {
    var instance = new DeferrableType();
    return instance.toString.apply(instance, arguments);
  };
});
