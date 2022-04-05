/**
 * Get a random number between min and max.
 */
export const random = (max: number, min: number = 0) =>
    Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Get delay in seconds.
 */
export const delay = (second: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, second * 1000));

/**
 * Compare two objects in string comparison.
 */
export const compare = (a: any, b: any) =>
    JSON.stringify(a) === JSON.stringify(b);
