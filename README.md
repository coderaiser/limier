# limier [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Find string in list by pattern. This is how open in `Chrome Developer Tools` and `WebStorm` works.

## Install

```
npm i limier --save
```

## How to use?

```js
const limier = require('limier');

limier('hello', ['hello', 'world']);
// returns
['hello'];

limier('bwiw', ['hello', 'biggestWordInAWorld']);
// returns
['biggestWordInAWorld']

limier('abc', ['hello', 'biggestWordInAWorld']);
// returns
[]
```

## Environments

In old `node.js` environments that not fully supports `es2015`, `limier` could be used with:

```js
var limier = require('limier/legacy');
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/limier.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/limier/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/gemnasium/coderaiser/limier.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/limier "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/limier  "Build Status"
[DependencyStatusURL]:      https://gemnasium.com/coderaiser/limier "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/limier?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/limier/badge.svg?branch=master&service=github

