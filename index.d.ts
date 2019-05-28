
declare class Arguments {
	public constructor(arg: any);

	public get(): string;

	public next(): Arguments;

	public is(key: string): boolean;
}

declare namespace cli {

	declare class Cli {
		public constructor(arg: string[], map: Object<string | string[]>);

		public end(): string;

		public cwd(): string;

		public has(name: string): boolean;

		public get(name: string): string;

		public argument(): Arguments;
	}

	declare class Map {
		public constructor(key: string);

		public alias(alias: string[]): Map;

		public argument(): Map;

		public arg(): Map;
	}

}

export as namespace cli;
export = cli;