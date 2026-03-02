import { getCommands } from "./commands.js";
import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const lowerCaseInput = input.toLowerCase();
    const regEx: RegExp = /\s{2,}/gm
    const splittedTrimmed = lowerCaseInput.replaceAll(regEx, " ").trim()
    return splittedTrimmed.split(" ");
}


export async function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", async (input) => {
        const words = cleanInput(input)
        if (words.length === 0) {
            state.readline.prompt();
            return
        } else {
            const cmdName = words[0]
            const commands = getCommands()
            const cmd = commands[cmdName]
            if (!cmd) {
                console.log("Unknown command")
            } else {
                try {
                    await cmd.callback(state);
                } catch (e) {
                    console.log((e as Error).message);

                }
            }
        } state.readline.prompt();

    })

}

