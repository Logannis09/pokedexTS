import { PokeAPI } from "./pokeapi.js";
import { State } from "./state.js";
export async function commandPokedex(state: State): Promise<void> {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("The Pokedex is empty!")
    } else {
        console.log("Your Pokedex:")
        for (let [key, pokemon] of Object.entries(state.pokedex)) {
            console.log(` - ${state.pokedex[key].name}`)
        }
    }
}