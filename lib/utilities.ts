import { readLines } from "https://deno.land/std@0.140.0/io/mod.ts";
import { writeAll } from "https://deno.land/std@0.140.0/streams/conversion.ts ";
import { styles } from "./deps.ts"

export type CommandResult = {
    status: "ok"
} | {
    status: "Error",
    stdout: string,
    stderr: string
}

/** Synthesize platform dependent shell command arguments. */
function shArgs(command: string): string[] {
    if (Deno.build.os === "windows") {
        return ["PowerShell.exe", "-Command", command];
    } else {
        const shellExe = Deno.env.get("SHELL") ?? "/bin/sh";
        return [shellExe, "-c", command];
    }
}

/*
0x6a j ┘
0x6b k ┐
0x6c l ┌
0x6d m └
0x6e n ┼
0x71 q ─
0x74 t ├
0x75 u ┤
0x76 v ┴
0x77 w ┬
0x78 x │

*/


export function value_format(text: string): string {
    return `${styles.bold.open}${styles.white.open}${text}${styles.white.close}${styles.bold.close}`;
}

export function process_format(text: string): string {
    return `${styles.blue.open}${text}${styles.blue.close}`;
}

export function prompt_format(text: string): string {
    return `${styles.yellow.open}${text}${styles.yellow.close}`;
}

export function success_format(text: string): string {
    return `${styles.green.open}${text}${styles.green.close}`;
}

export function failure_format(text: string): string {
    return `${styles.red.open}${text}${styles.red.close}`;
}

export async function run(command: string): Promise<number> {
    //throw "todo";

    console.log(`${value_format("┌")} ${process_format("running '")}${value_format(command)}${process_format("'")}`);

    const cmd = shArgs(command);
    const process = Deno.run({
        cmd: cmd,
        stdin: "piped",
        stdout: "piped",
        stderr: "piped"
    });

    const [_o, _e, satus] = await Promise.all([pipe_out(process.stdout), pipe_out(process.stderr), process.status()]);
    const code = satus.code;
    return code;
}

export async function pipe_out(out: Deno.Reader) {
    const encoder = new TextEncoder();
    for await (const line of readLines(out))
        await writeAll(Deno.stdout, encoder.encode(`${value_format("│")} ${line}\n`));
}

// asks a question to the user
export async function prompt(line: string, options?: string[], default_?: string) {

    let options_part = "";
    if (options != undefined) options_part = `[${options.map(s => value_format(s)).join('/')}]`;

    let default_part = "";
    if (default_ != undefined) default_part = `(default: '${default_}')`;

    const text = `─> ${prompt_format(line)} ${options_part} ${default_part}`;
    console.log(text);

    for await (const line of readLines(Deno.stdin)) {
        if (default_ != undefined && line == "") return default_;

        if (options != undefined && !options.includes(line)) {
            console.log(text);
            continue;
        }

        return line
    }
}
