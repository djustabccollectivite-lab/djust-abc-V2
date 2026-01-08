/**
 * An utility function for working with local storage items that have expiration time.
 */
export default {
    /**
     * Sets an item in the local storage with an expiration time.
     * @param key - The key to identify the item.
     * @param value - The value to be stored.
     * @param expiration - The expiration time in milliseconds.
     */
    setItem(key: string, value: string, expiration: number): void {
        localStorage.setItem(key, JSON.stringify({ value, expiration: Date.now() + expiration }));
    },
    /**
     * Retrieves the value associated with the specified key from the local storage.
     * If the value is expired or not found, it returns null.
     *
     * @param key - The key of the item to retrieve.
     * @returns The value associated with the key, or null if the item is expired or not found.
     */
    getItem(key: string): string | null {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        const parsedItem = JSON.parse(item);
        if (parsedItem.expiration < Date.now()) {
            localStorage.removeItem(key);
            return null;
        }
        return parsedItem.value;
    },
    /**
     * Removes an item from the local storage based on the specified key.
     *
     * @param key - The key of the item to be removed.
     */
    removeItem(key: string): void {
        localStorage.removeItem(key);
    },
    /**
     * Refreshes an item in the local storage by updating its expiration time.
     * If the item does not exist, nothing happens.
     *
     * @param key - The key of the item to refresh.
     * @param expiration - The new expiration time for the item, in milliseconds.
     */
    refreshItem(key: string, expiration: number): void {
        const item = localStorage.getItem(key);
        if (!item) {
            return;
        }
        const parsedItem = JSON.parse(item);
        localStorage.setItem(key, JSON.stringify({ value: parsedItem.value, expiration: Date.now() + expiration }));
    },
};
