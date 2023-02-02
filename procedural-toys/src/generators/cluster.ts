import { Vector3 } from "@react-three/fiber";
import Alea from "alea";

interface ClusterParametersBase {
    type: string;
    seed: number;
    count: number;
}

interface SphereClusterParameters extends ClusterParametersBase {
    type: "sphere";
    radius: number;
    uniform: boolean;
}

export type ClusterParameters = SphereClusterParameters;

export type ClusterFunction = (
    params: ClusterParameters,
    coordinate: readonly [number, number, number],
    extras?: { [key: string]: any }
) => number; // Takes parameters, the x/y/z coordinate, and any extra parameters. Returns 0-1

const LIMITERS: {
    [key: string]: ClusterFunction;
} = {
    sphere: (params: SphereClusterParameters, coord, extras) => {
        const dist = Math.sqrt(
            Math.pow(coord[0], 2) +
                Math.pow(coord[1], 2) +
                Math.pow(coord[2], 2)
        );
        if (params.uniform) {
            return dist <= params.radius ? 1 : 0;
        } else {
            return dist <= params.radius && extras
                ? extras.prng() > dist / params.radius
                    ? 1
                    : 0
                : 0;
        }
    },
};

export function generateCluster(params: ClusterParameters): Vector3[] {
    const prng = Alea(params.seed);
    const points: Vector3[] = [];
    switch (params.type) {
        case "sphere":
            for (let i = 0; i < params.count; i++) {
                const coordinate: Vector3 = [
                    prng() * 2 * (prng() - 0.5) * params.radius,
                    prng() * 2 * (prng() - 0.5) * params.radius,
                    prng() * 2 * (prng() - 0.5) * params.radius,
                ];
                const prob = LIMITERS.sphere(params, coordinate, { prng });
                if (prob === 1) {
                    points.push(coordinate);
                } else {
                    i--;
                }
            }
            break;
        default:
            break;
    }
    return points;
}
