
class Map {

	constructor(key) {
		this._key = key;
		this._noArgument = false;
	}

	value() {
		return {
			key: this._key,
			alias: this._alias || [],
			arg: this._noArgument
		};
	}

	alias(alias) {
		this._alias = alias;
		return this;
	}

	noArgument() {
		this._noArgument = true;
		return this;
	}

	noArg() {
		return this.noArgument();
	}

}

module.exports = Map;
