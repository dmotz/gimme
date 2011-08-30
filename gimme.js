#!/usr/bin/env node

/**
 * gimme
 * cut through the cruft of whois, find availability info quickly
 * usage: $ gimme example
 * uses twitter.com and instantdomainsearch.com for data
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
        str += '\x1b[0mand \x1b[36mtwitter\x1b[0m right now. '
            + '\n\nHere\'s what gimme found anyway:';
        console.log(str);
    }
}
var http = require('http'),
    dParams = {
        host : 'instantdomainsearch.com',
        port : 80,
        path : '/services/quick/?name=' + domain
    },
    tParams = {
        host : 'twitter.com',
        port : 80,
        path : '/' + domain
    };

http.get(dParams, function(res){
    var data = '';
    res.on('data', function(chunk){
        data += chunk;
    });
    res.on('end', function(){
        try{
            var obj = JSON.parse(data);
        }catch(e){
            console.log(' \x1b[31msomething went wrong checking the domain status...\x1b[0m\n');
            return;
        }
        for(var i = 0, len = exts.length; i < len; i++){
            var status = (obj[exts[i]] === 'a') ? 'YES  ' : ' NO  ',
                color = (status === 'YES  ') ? '\x1b[32m' : '\x1b[31m',
                str = color + status + domain + '.' + exts[i] + '\x1b[0m';
            console.log(str);
        }
    });
});

http.get(tParams, function(res){
    if(res.statusCode === 200){
        console.log('\x1b[31m NO  twitter.com/' + domain + '\x1b[0m');
    }else{
        console.log('\x1b[32mYES  twitter.com/' + domain + '\x1b[0m');
    }
});