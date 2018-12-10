
class Arguments {

	constructor(arg) {
		this._arg = arg;
		this._i = 0;
	}

	is(key) {
		if (this._arg[this._i] === key) {
			this._i += 1;
			return true;
		}
		return false;
	}

}

module.exports = Arguments;
