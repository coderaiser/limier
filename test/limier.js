'use strict';

let limier  = require('../src/limier');
let test    = require('tape');

test('direct search', t => {
    let result = limier('hello', ['hello', 'world']);
    
    t.deepEqual(result, ['hello']);
    t.end();
});

test('pattern search', t => {
    let result = limier('bwiw', ['hello', 'biggestWordInAWorld']);
    
    t.deepEqual(result, ['biggestWordInAWorld']);
    t.end();
});

test('arguments: no', t => {
    t.throws(limier, /pattern should be string!/, 'should throw when no pattern');
    t.end();
});

test('arguments: no list', t => {
    let fn = () => limier('hello');
    
    t.throws(fn, /list should be an array!/, 'should throw when no list');
    t.end();
});
