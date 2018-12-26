import Arguments from './src/arguments';

declare class Arguments {
	public constructor(arg: any);

	public get(): string;

	public next(): Arguments;

	public is(key: string): boolean;
}

export default Arguments;