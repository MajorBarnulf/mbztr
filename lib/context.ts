import { Setup } from "./setup.ts"

export type Config = {
    working_directory: string,
}

export class Context {
    installed_names: string[];
    to_install: Setup[];
    working_dir: string;

    constructor(config: Config) {
        this.installed_names = [];
        this.to_install = [];
        this.working_dir = config.working_directory;
    }

    push_to_install(setup: Setup) {
        this.to_install.push(setup)
    }

    set_installed(setup: Setup) {
        const index = this.to_install.findIndex(e => e.name == setup.name);
        if (index != -1) this.to_install.splice(index, 1);
        this.installed_names.push(setup.name);
    }

    set_failed(setup: Setup) {
        const index = this.to_install.findIndex(e => e.name == setup.name);
        if (index != -1) this.to_install.splice(index, 1);
    }

    next_to_install(): Setup | undefined {
        return this.to_install[0]
    }
}