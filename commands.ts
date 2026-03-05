import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "It displays the names of the next 20 locations.",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "It displays the names of the previous 20 locations.",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "List out the pokemon in a specified area. It takes 1 string as an input.",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Tries to catch a pokmon. It takes 1 string as an input.",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Displays a caught Pokemon's stats. It takes 1 string as an input.",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Displays all Pokemon caught.",
            callback: commandPokedex,
        }


    };
}