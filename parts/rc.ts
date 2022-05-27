import { Setup, SetupResult } from "../lib/setup.ts"

export class RcSetup extends Setup {
    async install(): Promise<SetupResult> {
        return "Ok";
    }
}
