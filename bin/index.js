#!/usr/bin/env node

const {Cli, Map} = require('cli.util'),
	Docker = require('./docker.js');

let cli = new Cli(process.argv, [
	new Map('name').alias(['n', 'N']).arg()
], 1);

new Docker().toFile().then(() => {
	console.log('done');
});
