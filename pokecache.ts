export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined
    #interval: number = 0

    constructor(interval: number) {
        this.#interval = interval
        this.#startReapLoop()
    }

    add<T>(key: string, val: T) {
        const newCacheEntry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val
        }
        this.#cache.set(key, newCacheEntry);
    }
    get<T>(key: string): T | undefined {

        const cachedItem = this.#cache.get(key)
        if (!cachedItem) {
            return undefined
        } else {
            return cachedItem.val as T
        }
    }
    #reap() {
        const limit = Date.now() - this.#interval
        for (const [key, value] of this.#cache) {
            if (value.createdAt < limit) {
                console.log(`${key} has been deleted`)
                this.#cache.delete(key)
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId)
        this.#reapIntervalId = undefined
    }

}

export type CacheEntry<T> = {
    createdAt: number,
    val: T
}