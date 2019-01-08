
const Arguments = require('./arguments.js'),
	Map = require('./map.js');

class Cli {

	constructor(args) {
		if (!Array.isArray(args)) {
			throw new Error('expected a array from argv.');
		}
		this._arg = args;
		this._format = {
			options: [],
			argument: []
		};
		this._max = null;
		this._map = {};
		this._argument = {};
	}

	getMap(a) {
		let out = [];
		if (Array.isArray(a)) {
			for (let i in a) {
				out.push(this._map[a[i]] ? this._map[a[i]] : a[i]);
			}
		} else {
			out.push(this._map[a] ? this._map[a] : a);
		}
		return out;
	}

	getKey(i) {
		let arg = this._arg[i];
		if (arg.length === 2) {
			return this.getMap(arg[1])[0];
		}
		return (arg[1] === '-') ? this.getMap(arg.substr(2)) : this.getMap((arg.substr(1)).split(''));
	}

	isOption(str) {
		return str[0] === '-';
	}

	addOption(a, b) {
		this._format.options.push({option: a, argument: b});
		return this;
	}

	isArg(i, key) {
		let ni = (i + 1);
		return (!this._argument[key] && ni < this._arg.length && !this.isOption(this._arg[ni]));
	}

	parseOption(i) {
		let arg = this._arg, key = this.getKey(i);
		let ni = (i + 1), isArg = this.isArg(i, key) ? arg[ni] : null;
		if (arg[i].length === 2) {
			this.addOption(key, isArg);
			return isArg ? 1 : 0;
		}
		if (key.length === 1) {
			this.addOption(key[0], isArg);
			return isArg ? 1 : 0;
		}
		for (let x in key) {
			this.addOption(key[x], null);
		}
		return 0;
	}

	parse() {
		let i = 0, arg = this._arg, length = arg.length;
		while (i < length && (!this._max || this._format.argument.length < this._max)) {
			if (this.isOption(arg[i])) {
				i += this.parseOption(i);
			} else {
				this._format.argument.push(arg[i]);
			}
			i += 1;
		}
		return i;
	}

	setMax(n) {
		this._max = Number(n);
		return this;
	}

	setMap(a) {
		for (let i in a) {
			if (!(a[i] instanceof Map)) {
				throw new Error('not a map instance can\'t setup options.');
			}
			let v = a[i].value();
			for (let x in v.alias) {
				if (this._map[v.alias[x]]) {
					throw new Error('two alias\'s for found in map.');
				}
				this._map[v.alias[x]] = v.key;
			}
			this._argument[v.key] = v.arg;
		}
		return this;
	}

	option() {
		return this._format.options;
	}

	argument() {
		return new Arguments(this._format.argument);
	}

}

module.exports = Cli;
