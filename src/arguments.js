
class Arguments {

	constructor(arg) {
		this._arg = arg;
		this._i = 0;
	}

	get() {
		return this._arg[this._i];
	}

	next() {
		this._i += 1;
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
