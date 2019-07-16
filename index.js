#!/usr/bin/env node

var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');

var PATH = process.argv[2] ? './' + process.argv[2] : './client';

console.log(PATH)

fs.mkdir(PATH, function (err) {
    err && console.log(err);
});
fse.copy(path.join(__dirname, 'package'), PATH);