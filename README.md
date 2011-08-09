# gimme

Cut through the cruft of whois. 

Simple command line utility that takes a name and shows domain and twitter availability.

Requires node.js and npm. Uses twitter.com and instantdomainsearch.com for data.

### Installation:

	$ npm install -g gimme

### Usage:

	$ gimme example

or with an extension:

	$ gimme example.com

Outputs:

	 NO  example.com
	 NO  example.net
	 NO  example.org
	 NO  example.biz
	 NO  example.mobi
	 NO  twitter.com/example
	
(your name might have better luck.)