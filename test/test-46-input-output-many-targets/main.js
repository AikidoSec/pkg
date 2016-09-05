#!/usr/bin/env node

'use strict';

const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const target = process.argv[2] || 'latest';
const latest = 'node6';
const input = './test-x-index.js';
let { arch } = process; // TODO extract arch from `target` once it contains
arch = { ia32: 'x86' }[arch] || arch;

const newcomers = [
  `test-output-${latest}-linux-${arch}`,
  `test-output-${latest}-osx-${arch}`,
  `test-output-${latest}-win-${arch}.exe`
];

const before = utils.filesBefore(newcomers);

utils.pkg.sync([
  '--target', `linux,osx,win`,
  '--output', 'test-output', input
]);

utils.filesAfter(before, newcomers);