(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.limier = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var tail = function tail(list) {
    return slice(list, 1);
};

module.exports = apart;

function apart(fn) {
    check(fn);

    var first = tail(arguments);

    return function () {
        var args = [].concat(_toConsumableArray(first), Array.prototype.slice.call(arguments));

        return fn.apply(undefined, _toConsumableArray(args));
    };
}

function slice(list, from, to) {
    return [].slice.call(list, from, to);
}

function check(fn) {
    if (typeof fn !== 'function') throw Error('fn should be function!');
}
},{}],2:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var squad = require('squad');
var apart = require('apart');

var unary = function unary(fn) {
    return function (value) {
        return fn(value);
    };
};
var notEmpty = function notEmpty(value) {
    return !!value;
};

module.exports = somefilter;

function somefilter(condition, filters) {
    if (!filters) {
        filters = condition;
        condition = notEmpty;
    }

    checkAll(condition, filters);

    var storify = store(condition);
    var process = apart(squad, condition, storify);

    var processingFilters = filters.map(unary(process)).reverse();

    return function () {
        var _arguments = arguments;

        processingFilters.some(function (filter) {
            return filter.apply(undefined, _arguments);
        });

        return storify();
    };
}

function store(condition) {
    var cache = undefined;

    if (!condition) condition = notEmpty;

    return function (value) {
        var result = undefined;

        if (condition(value)) {
            cache = result = value;
        } else {
            result = cache;
            cache = null;
        }

        return result;
    };
}

function checkAll(condition, filters) {
    if (typeof condition !== 'function') throw Error('condition should be function!');

    if (!Array.isArray(filters)) throw Error('filters should be an array!');

    check('function', filters);
}

function check(type, array) {
    var getType = function getType(item) {
        return typeof item === 'undefined' ? 'undefined' : _typeof(item);
    },
        notEqual = function notEqual(a, b) {
        return a !== b;
    },
        wrong = function wrong(type) {
        throw Error('fn should be ' + type + '!');
    },
        wrongType = apart(wrong, type),
        notType = apart(notEqual, type);

    if (!array.length) wrongType(type);else array.map(getType).filter(notType).forEach(wrongType);
}
},{"apart":1,"squad":3}],3:[function(require,module,exports){
(function(global) {
    'use strict';
    
    if (typeof module !== 'undefined' && module.exports)
        module.exports  = squad;
    else
        global.squad    = squad;
    
    function squad() {
        var funcs = [].slice.call(arguments);
                
        check('function', funcs);
        
        return function() {
            return funcs
                .reduceRight(apply, arguments)
                .pop();
        };
    }
    
    function apply(value, fn) {
        return [fn.apply(null, value)];
    }
    
    function check(type, array) {
        var wrongType   = partial(wrong, type),
            notType     = partial(notEqual, type);
        
        if (!array.length)
            wrongType(type);
        else
            array
                .map(getType)
                .filter(notType)
                .forEach(wrongType);
    }
    
    function partial(fn, value) {
        return fn.bind(null, value);
    }
    
    function getType(item) {
        return typeof item;
    }
    
    function notEqual(a, b) {
        return a !== b;
    }
    
    function wrong(type) {
        throw Error('fn should be ' + type + '!');
    }
    
})(this);

},{}],"limier":[function(require,module,exports){
'use strict';

let somefilter  = require('somefilter');
let checkResult = value => value && value.length;
let limier      = somefilter(checkResult, [
    findByAbr,
    findByName
]);

module.exports = function(pattern, list) {
    check(pattern, list);
    
    return limier(pattern, list) || [];
};

function findByName(str, names) {
    return names.filter(name =>
        ~name.indexOf(str)
    );
}

function findByAbr(str, names) {
    let regstr = str.split('').join('.*') + '.*';
    let regexp = RegExp(`^${ regstr }$`, 'i');
    
    return names.filter(name =>
        regexp.test(name)
    );
}

function check(pattern, list) {
    if (typeof pattern !== 'string')
        throw Error('pattern should be string!');
    
    if (!Array.isArray(list))
        throw Error('list should be an array!');
}

},{"somefilter":2}]},{},["limier"])("limier")
});