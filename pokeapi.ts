import { BlobOptions } from "node:buffer";
import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2/";
    #cache: Cache;

    constructor(interval: number) {
        this.#cache = new Cache(interval)
    }

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}location-area`
        let cached = this.#cache.get<ShallowLocations>(url)
        if (!cached) {
            try {
                const resp = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                })
                if (!resp.ok) {
                    throw new Error(`${resp.status} ${resp.statusText}`)
                }
                const locations = await resp.json() as ShallowLocations
                this.#cache.add(url, locations)
                return locations
            } catch (e) {
                throw new Error(`Error fetching locations: ${(e as Error).message}`);
            }
        } else {
            return cached

        }
    }
    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}location-area/${locationName}`
        console.log(url)
        let cached = this.#cache.get<Location>(url)
        if (!cached) {
            try {
                const resp = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                })
                if (!resp.ok) {
                    throw new Error(`${resp.status} ${resp.statusText}`)
                }
                const location = await resp.json() as Location
                this.#cache.add(url, location)
                return location
            } catch (e) {
                throw new Error(`Error fetching location ${locationName}: ${(e as Error).message}`);
            }
        } else {
            return cached
        }
    }
    async fetchPokemon(pokemonID: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}pokemon/${pokemonID}`
        console.log(url)
        let cached = this.#cache.get<Pokemon>(url)
        if (!cached) {
            try {
                const resp = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                })
                if (!resp.ok) {
                    throw new Error(`${resp.status} ${resp.statusText}`)
                }
                const pokemon = await resp.json() as Pokemon
                this.#cache.add(url, pokemon)
                return pokemon
            } catch (e) {
                throw new Error(`Error fetching pokemon ${pokemonID}: ${(e as Error).message}`);
            }
        } else {
            return cached
        }
    }
}

export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        name: string,
        url: string,
    }[]
};



export type Location = {
    id: number,
    name: string,
    game_index: number,
    encounter_method_rate: {
        encounter_method: {
            name: string,
        },
        version_details: {
            rate: number,
            version: {
                name: string,
            }
        }[],
    },
    location: {
        name: string,
    },
    names: [
        {
            name: string,
        },
    ],
    pokemon_encounters: {
        pokemon: {
            name: string,
            url: string,
        }
        version_details: [
            {
                version: {
                    name: string,
                },
                max_chance: number,
                encounter_details: {
                    min_level: number,
                    max_level: number,
                    condition_values: [],
                    chance: number,
                    method: {
                        name: string,
                    }
                }
            },
        ]
    }[]
}
export type Pokemon = {
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    abilities: [
        {
            is_hidden: boolean,
            slots: number,
            ability: {
                name: string,
            }
        }
    ],
    types: [
        {
            slot: number,
            type: {
                name: string
            }
        }
    ],
    stats: [
        {
            base_stat: number,
            stat: {
                name: string,
            },
        },
    ],
}

