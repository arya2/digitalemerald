/*

*/


var Parser = require("simple-text-parser"),
    parser = new Parser(),
    fs = require('fs'),
    readline = require('readline');

var results = [];

parser.addRule(/\#[\S]+/ig, function(tag) {
    return 0;
});

var rd = readline.createInterface({
    input: fs.createReadStream('stripped.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    if(topic)results.push({line:[]});
    if()
});