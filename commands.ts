import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
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
            description: "It displays the names of the next 20 locations.Each subsequent call to map should display the next 20 locations, and so on.",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "It displays the names of the previous 20 locations.Each subsequent call to map should display the previous 20 locations, and so on.",
            callback: commandMapb,
        },
        // can add more commands here
    };
}