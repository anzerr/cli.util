import Arguments from './src/arguments';

declare class Cli {
	public constructor(arg: string[], map: Object<string | string[]>);

	public cwd(): string;

	public has(name: string): boolean;

	public get(name: string): string;

	public argument(): Arguments;
}

export default Cli;