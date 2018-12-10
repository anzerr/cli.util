
const Arguments = require('./arguments.js');

class Cli {

	constructor(args) {
		this._arg = args;
		this._format = {
			options: [],
			argument: []
		};
		this._map = {};
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
		return (out);
	}

	_isOption(str) {
		return str[0] === '-';
	}

	/**
	 * need to clean this up coded a while ago
	 * @returns {[type]} [description]
	 */
	parse() {
		let i = 0;
		while (i < this._arg.length) {
			if (this._arg[i][0] === '-') {
				if (this._arg[i].length === 2) {
					this._format.options.push({
						option: this._getMap(this._arg[i][1])[0],
						argument: ((i + 1) < this._arg.length && !this._isOption(this._arg[i + 1])) ? this._arg[i + 1] : null
					});
					i += ((i + 1) < this._arg.length && !this._isOption(this._arg[i + 1])) ? 1 : 0;
				} else {
					let a = (this._arg[i][1] === '-') ? this._getMap(this._arg[i].substr(2)) : this._getMap((this._arg[i].substr(1)).split(''));
					if (a.length === 1) {
						this._format.options.push({
							option: a[0],
							argument: ((i + 1) < this._arg.length && !this._isOption(this._arg[i + 1])) ? this._arg[i + 1] : null
						});
						i += ((i + 1) < this._arg.length && !this._isOption(this._arg[i + 1])) ? 1 : 0;
					} else {
						for (let x in a) {
							this._format.options.push(a[x]);
						}
					}
				}
			} else {
				this._format.argument.push(this._arg[i]);
			}
			i += 1;
		}
		return this;
	}

	setMap(a) {
		for (let i in a) {
			if (Array.isArray(a[i]) || typeof (a[i]) === 'string') {
				if (Array.isArray(a[i])) {
					for (let x in a[i]) {
						this._map[a[i][x]] = i;
					}
				} else {
					this._map[a[i]] = i;
				}
			}
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
