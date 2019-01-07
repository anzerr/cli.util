
const Arguments = require('./arguments.js'),
	Map = require('./src/map.js');

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
		this._map = {};
		this._argument = {};
	}

	_getMap(a) {
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

	_getKey(i) {
		let arg = this._arg[i];
		if (arg.length === 2) {
			return this._getMap(arg[1])[0];
		}
		return (arg[1] === '-') ? this._getMap(arg.substr(2)) : this._getMap((arg.substr(1)).split(''));
	}

	_isOption(str) {
		return str[0] === '-';
	}

	_addOption(a, b) {
		this._format.options.push({option: a, argument: b});
		return this;
	}

	_isArg(i, key) {
		let ni = (i + 1);
		return (!this._argument[key] && ni < this._arg.length && !this._isOption(this._arg[ni]));
	}

	_parseOption(i) {
		let arg = this._arg, key = this._getKey(i);
		let ni = (i + 1), isArg = this._isArg(i, key) ? arg[ni] : null;
		if (arg[i].length === 2) {
			this._addOption(key, isArg);
			return isArg ? 1 : 0;
		}
		if (key.length === 1) {
			this._addOption(key[0], isArg);
			return isArg ? 1 : 0;
		}
		for (let x in key) {
			this._addOption(key[x], null);
		}
		return 0;
	}

	parse() {
		let i = 0, arg = this._arg, length = arg.length;
		while (i < length) {
			if (this._isOption(arg[i])) {
				i += this._parseOption(i);
			} else {
				this._format.argument.push(arg[i]);
			}
			i += 1;
		}
		return this;
	}

	setMap(a) {
		if (!(a instanceof Map)) {
			throw new Error('not a map instance can\'t setup options.');
		}
		for (let i in a) {
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
