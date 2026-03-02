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
            console.log("cached used")
            return cached

        }
    }

    /*    async fetchLocation(locationName: string): Promise<Location> {
           // implement this
       } */
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

/*  export type Location = {
  
} */