
class Map {

	constructor(key) {
		this._key = key;
		this._noArgument = true;
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

	argument() {
		this._noArgument = false;
		return this;
	}

	arg() {
		return this.argument();
	}

}

module.exports = Map;
