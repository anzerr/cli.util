
class Arguments {

	constructor(arg) {
		this._arg = arg;
		this._i = 0;
	}

	all() {
		return this._arg;
	}

	get() {
		return this._arg[this._i];
	}

	next() {
		this._i += 1;
		return this;
	}

	is(key) {
		if (this.get() === key) {
			this.next();
			return true;
		}
		return false;
	}

}

module.exports = Arguments;
