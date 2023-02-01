export function rcoord(bounds: number, dimensions: number) {
    const out = [];
    for (let i = 0; i < dimensions; i++) {
        out.push(Math.random() * (2 * (Math.random() - 0.5)) * bounds);
    }
    return out;
}