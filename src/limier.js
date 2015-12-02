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
