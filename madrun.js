'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => 'tape test/*.js',
    'coverage': () => 'nyc npm test',
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
    'lint': () => 'putout lib test madrun.js',
    'fix:lint': () => run('lint', '--fix'),
};

