import { run } from "../lib/utilities.ts"
import { Setup, SetupResult } from "../lib/setup.ts"

export class HelloWorldSetup extends Setup {
    constructor() {
        super({ name: "hello-world" });
    }

    async install(): Promise<SetupResult> {
        await run("echo hello yorld");
        return "Ok"
    }
}
