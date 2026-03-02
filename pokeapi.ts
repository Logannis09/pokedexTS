export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2/";

    constructor() { }

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {

        const url = !pageURL ? `${PokeAPI.baseURL}location-area` : pageURL
        try {
            const resp = await fetch(url, {
                method: "GET",
                mode: "cors",
            })
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`)
            }
            const locations = await resp.json()
            return locations as ShallowLocations
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
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