
declare class Arguments {
	public constructor(arg: any);

	public get(): string;

	public next(): Arguments;

	public is(key: string): boolean;
}

declare namespace cli {

	class Cli {
		public constructor(arg: string[], map?: any[], max?: number);

		public end(): string;

		public cwd(): string;

		public has(name: string): boolean;

		public get(name: string): string;

		public argument(): Arguments;
	}

	class Map {
		public constructor(key: string);

		public alias(alias: string[]): Map;

		public argument(): Map;

		public arg(): Map;
	}

}

export as namespace cli;
export = cli;