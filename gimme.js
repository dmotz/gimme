#!/usr/bin/env node

/**
 * gimme
 * cut through the cruft of whois
 * usage: $ gimme example
 * uses instantdomainsearch.com for results
 * Dan Motzenbecker
 * MIT License
 */

var input = process.argv[2];
if(typeof input === 'undefined'){
	console.log('Try feeding me a name...like:\n$ gimme example');
	return;
}
var exts = ['com', 'net', 'org', 'biz', 'mobi'],
	domain = /^[\w-]+/.exec(input),
	ext = /\.\w+$/.exec(input);
if(ext !== null){
	ext = ext.toString().replace('.', '');
	if(exts.indexOf(ext) === -1){
		var str = 'Sorry, gimme only works with \x1b[36m';
		for(var i = 0, len = exts.length; i < len; i++){
			str += '.' + exts[i] + ' ';
		}
		str += '\x1b[0mright now. \n\nHere\'s what gimme found anyway:';
		console.log(str);
	}
}
var http = require('http'),
	params = {
		host : 'instantdomainsearch.com',
		port : 80,
		path : '/services/quick/?name=' + domain
	},
	req = http.get(params, function(res){
		var data = '';
		res.on('data', function(chunk){
			data += chunk;
		});
		res.on('end', function(){
			output(JSON.parse(data));
		});
	});
function output(obj){
	for(var i = 0, len = exts.length; i < len; i++){
		var status = (obj[exts[i]] === 'a') ? 'YES! ' : 'NO.  ',
			color = (status === 'YES! ') ? '\x1b[32m' : '\x1b[31m',
			str = color + status + domain + '.' + exts[i] + '\x1b[0m';
		console.log(str);
	}
}