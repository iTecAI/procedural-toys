export function parseEquation(eq: string): Function {
    try {
        /* eslint-disable */
        return new Function("v", `try {return ${eq};} catch (e) {return 0;}`);
        /* eslint-enable */
    } catch (e) {
        return (v: any) => 1;
    }
}