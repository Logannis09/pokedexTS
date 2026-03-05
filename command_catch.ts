import { error } from "node:console";
import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Please aim at a Pokemon.")
    } else if (args.length > 1) {
        throw new Error("You can only try to catch one Pokemon at a time.")
    } else {
        const pokemonID = args[0]
        const pokemon = await state.pokeAPI.fetchPokemon(pokemonID);
        const roll = Math.floor(Math.random() * 300);
        const name = pokemon.name
        console.log(`Throwing a Pokeball at ${pokemonID}...`)
        if (roll > pokemon.base_experience) {
            state.pokedex[name] = pokemon
            console.log(`${name} was caught`)
            return
        }
        console.log(`${name} escaped`)

    }
}
