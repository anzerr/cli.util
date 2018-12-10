
const Cli = require('./index.js');

let cli = new Cli(process.argv, {
		help: ['h', 'H'],
		port: 'p'
	}), arg = null;

arg = cli.argument();
if (arg.is('print')) {
	if (arg.is('cat')) {
		console.log('this is a cat');
	}
	if (arg.is('dog')) {
		console.log('this is a dog');
	}
}

arg = cli.argument();
if (arg.is('foods')) {
	console.log(cli.has('egg') ? 'only chicken eggs' : 'loads of eggs');
}
