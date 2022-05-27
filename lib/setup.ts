import { Context } from "./context.ts"

export type SetupResult = "Ok" | "Error";

export abstract class Setup {
    name: string;
    dependencies: string[];

    constructor(options: { name: string, dependencies?: string[] }) {
        this.dependencies = options.dependencies ?? [];
        this.name = options.name;
    }

    abstract install(context: Context): Promise<SetupResult>;
}
