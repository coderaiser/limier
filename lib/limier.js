'use strict';

const somefilter = require('somefilter');
const currify = require('currify');

const isIncludes = currify((str, name) => name.includes(str));
const isEqual = (a) => a && a.length;
const limier = somefilter(isEqual, [
    findByAbr,
    findByName,
]);

module.exports = (pattern, list) => {
    check(pattern, list);
    
    return limier(pattern, list) || [];
};

function findByName(str, names) {
    return names.filter(isIncludes(str));
}

function findByAbr(str, names) {
    const regstr = str
        .split('')
        .join('.*') + '.*';
    
    const regexp = RegExp(`^${ regstr }$`, 'i');
    const test = regexp.test.bind(regexp);
    
    return names.filter(test);
}

function check(pattern, list) {
    if (typeof pattern !== 'string')
        throw Error('pattern should be string!');
    
    if (!Array.isArray(list))
        throw Error('list should be an array!');
}

