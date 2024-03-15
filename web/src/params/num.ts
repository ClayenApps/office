export function match(value: string): value is `${number}` {
    return /^[0-9]+$/.test(value);
}
