'use strict';

const somefilter = require('somefilter/legacy');
const limier = somefilter([
    findByAbr,
    findByName
]);

module.exports = (pattern, list) => {
    check(pattern, list);
    
    return limier(pattern, list) || [];
};

function findByName(str, names) {
    return names.filter((name) =>
         name.includes(str)
    );
}

function findByAbr(str, names) {
    const regstr = str.split('').join('.*') + '.*';
    const regexp = RegExp(`^${ regstr }$`, 'i');
    
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

