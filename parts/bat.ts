import { Setup, SetupResult } from "../lib/setup.ts"
import { Context } from "../lib/context.ts"
import { prompt, run, prompt_format } from "../lib/utilities.ts"

export class BatSetup extends Setup {
    constructor() {
        super({ name: "bat" })
    }

    async install(context: Context): Promise<SetupResult> {
        const method = await prompt("Which method ?", ["pacman", "github", "cargo"], "pacman");

        if (method == "pacman") {
            await run("sudo pacman -S --noconfirm community/bat");
        }

        if (method == "github") {
            await run(`mkdir -p ${context.working_dir}`);
            await run(`wget "https://github.com/sharkdp/bat/releases/download/v0.21.0/bat-v0.21.0-i686-unknown-linux-gnu.tar.gz" -O "${context.working_dir}/bat-bin-linux.tar.gz"`);
            await run(`tar xf "${context.working_dir}/bat-bin-linux.tar.gz" -C "${context.working_dir}"`);
            await run(`mkdir -p "$HOME/.local/bin"`);
            await run(`cp "${context.working_dir}/bat-v0.21.0-i686-unknown-linux-gnu/bat" "$HOME/.local/bin/"`);
            await run(`rm -rf "${context.working_dir}/bat-v0.21.0-i686-unknown-linux-gnu" "${context.working_dir}/bat-bin-linux.tar.gz"`)
            console.log(prompt_format("Don't forget to add '$HOME/.local/bin' to your path."));
        }

        if (method == "cargo") {
            throw "TODO"
        }

        return "Ok"
    }
}
