
### `Intro`
This is a util to help create cli commands in node

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/cli.util.git
```

### `Example`
``` javascript
const {Cli, Map} = require('cli.util');

let cli = new Cli(process.argv, [
		new Map('help')
			.alias(['h', 'H']),
		new Map('port')
			.alias(['p', 'P'])
			.argument()
	], 1);


if (cli.argument().is('server')) {
	console.log('start on port', cli.get('port') || 80);
	return;
}
if (cli.argument().is('help')) {
	console.log('display command help');
	return;
}
console.log('command error');
```