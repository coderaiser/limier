'use strict';

const limier = require('..');
const test = require('supertape');

test('direct search', (t) => {
    const result = limier('hello', ['hello', 'world']);
    
    t.deepEqual(result, ['hello']);
    t.end();
});

test('pattern search', (t) => {
    const result = limier('bwiw', ['hello', 'biggestWordInAWorld']);
    
    t.deepEqual(result, ['biggestWordInAWorld']);
    t.end();
});

test('pattern search: no result', (t) => {
    const result = limier('abc', ['hello', 'biggestWordInAWorld']);
    
    t.deepEqual(result, []);
    t.end();
});

test('arguments: no', (t) => {
    t.throws(limier, /pattern should be string!/, 'should throw when no pattern');
    t.end();
});

test('arguments: no list', (t) => {
    const fn = () => limier('hello');
    
    t.throws(fn, /list should be an array!/, 'should throw when no list');
    t.end();
});

