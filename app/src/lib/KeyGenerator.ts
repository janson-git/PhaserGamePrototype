export default class KeyGenerator {
    private static key: number = 1;
    private static prefixedKeys: object = {};

    public static getNextKey(prefix?: string): string
    {
        let keyToReturn: string;
        if (prefix === undefined) {
            keyToReturn = '' + KeyGenerator.key;
            KeyGenerator.key++;
            return keyToReturn;
        }

        if (!KeyGenerator.prefixedKeys.hasOwnProperty(prefix)) {
            KeyGenerator.prefixedKeys[prefix] = 1;
        }
        keyToReturn = prefix + KeyGenerator.prefixedKeys[prefix];
        KeyGenerator.prefixedKeys[prefix]++;

        return keyToReturn;
    }

    public static resetAll(): void
    {
        KeyGenerator.key = 1;
        KeyGenerator.prefixedKeys = {};
    }
}
