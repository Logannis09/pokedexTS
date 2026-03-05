import { State } from "./state.js";
export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new Error("Please provide a location.")
    } else if (args.length > 1) {
        throw new Error("Too many arguments.")
    } else {
        const location = args[0]
        const locationData = await state.pokeAPI.fetchLocation(location);
        console.log(`Exploring ${location}...`)
        if (locationData.pokemon_encounters) {
            console.log("Found Pokemon:")
            for (let pokemon_encounter of locationData.pokemon_encounters) {
                console.log(` - ${pokemon_encounter.pokemon.name}`)
            }
        } else {
            console.log("No Pokomons were found")
        }
    }
}