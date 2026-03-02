import { error } from "node:console";
import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";
export async function commandMap(state: State) {
    if (state.nextLocationsURL === null) {
        throw new Error("You're at the end.")
    }
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (let result of locations.results) {
        console.log(result.name)
    }
};

export async function commandMapb(state: State) {
    if (!state.prevLocationsURL) {
        throw new Error("You're on the first page")
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    if (locations.next) {
        state.nextLocationsURL = locations.next
    } else {
        state.nextLocationsURL = ""
    }
    if (locations.previous) {
        state.prevLocationsURL = locations.previous
    } else {
        state.prevLocationsURL = ""
    }
    for (let result of locations.results) {
        console.log(result.name)
    }

};