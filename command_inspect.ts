import { error } from "node:console";
import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Please select a Pokemon.")
    } else if (args.length > 1) {
        throw new Error("You can only display one Pokemon at a time.")
    } else {
        const pokemonName = args[0]
        if (!state.pokedex[pokemonName]) {
            console.log("You haven't caught that Pokemon")
            return
        }
        const pokemon = state.pokedex[pokemonName]
        console.log(`Name: ${pokemon.name}`)
        console.log(`Height: ${pokemon.height}`)
        console.log(`Weight: ${pokemon.weight}`)
        if (pokemon.stats.length > 0) {
            console.log("Stats:")
            for (let stat of pokemon.stats) {
                console.log(`   -${stat.stat.name}: ${stat.base_stat}`)
            }
        }
        if (pokemon.types.length > 0) {
            console.log("Types:")
            for (let type of pokemon.types) {
                console.log(`  -${type.type.name}`)
            }

        }
    }
}
