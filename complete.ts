import { success_format, value_format, process_format, prompt, failure_format } from "./lib/utilities.ts"
import { Context, Config } from "./lib/context.ts"

// import { HelloWorldSetup } from "./parts/setup-hello-world.ts"
import { BatSetup } from "./parts/bat.ts"

const config: Config = {
    working_directory: "./barnulfizator-wd"
}
const all = [
    //new HelloWorldSetup(),
    // nano
    // sudo
    // rustup
    // paru
    // zsh
    // kitty
    // lvim
    // n
    // tldr
    new BatSetup(),
    // rc
];

async function main() {

    console.log(
        success_format("all components:\n")
        + all
            .map(s => `- '${value_format(s.name)}'`)
            .join("\n")
        + "\n"
    );

    const context = new Context(config);

    for (const setup of all) {
        const input = await prompt(`Install '${setup.name}' ?`, ["y", "n"], "y");
        if (input == "y") context.push_to_install(setup);
    }

    while (true) {
        const setup = context.next_to_install();
        if (setup == undefined) break;

        console.log(process_format("Installing '") + value_format(setup.name) + process_format("' ..."))
        const result = await setup.install(context);

        if (result == "Ok") {
            console.log(success_format("Installed '") + value_format(setup.name) + success_format("' successfully."));
            context.set_installed(setup);
        }
        else {
            console.log(failure_format("Failed to install '") + value_format(setup.name) + failure_format("'."));
            context.set_failed(setup);
        }
    }
}

await main()