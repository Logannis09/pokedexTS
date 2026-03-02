import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import readline from "readline";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    readline: Interface
    commands: Record<string, CLICommand>
    nextLocationsURL: string | null
    prevLocationsURL: string | null
    pokeAPI: PokeAPI
}
export function initState(): State {
    const initialState: State = {
        readline: readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        prevLocationsURL: "",
        nextLocationsURL: "",
        pokeAPI: new PokeAPI(100000),
    }
    return initialState
}