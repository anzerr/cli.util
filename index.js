
const Parser = require('./src/parser.js'),
	Map = require('./src/map.js');

class Cli {

	constructor(arg = [], map = [], max = null) {
		let [, , ...args] = arg;
		this._arg = args;
		this._parser = new Parser(this._arg);
		this._parser
			.setMap(map)
			.setMax(max);
		this._end = this._parser.parse();
		this._cwd = process.cwd();
	}

	end() {
		return this._end;
	}

	cwd() {
		return this._cwd;
	}

	has(name) {
		let o = this._parser.option();
		for (let i in o) {
			if (o[i].option === name) {
				return true;
			}
		}
		return false;
	}

	get(name) {
		let o = this._parser.option();
		for (let i in o) {
			if (o[i].option === name) {
				return o[i].argument;
			}
		}
		return null;
	}

	argument() {
		return this._parser.argument();
	}

}

module.exports = {Cli: Cli, Map: Map};
