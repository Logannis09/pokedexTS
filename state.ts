import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import readline from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface
    commands: Record<string, CLICommand>
    nextLocationsURL: string | null
    prevLocationsURL: string | null
    pokeAPI: PokeAPI
    pokedex: Record<string, Pokemon>
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
        pokeAPI: new PokeAPI(300000),
        pokedex: {}
    }
    return initialState
}