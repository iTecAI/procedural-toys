import { Html } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

function GridAxis(props: {
    rotation: [number, number, number];
    axis: "X" | "Y" | "Z";
}) {
    const positions = {
        X: [6, 0, 0],
        Y: [0, 6, 0],
        Z: [0, 0, 6],
    };
    return (
        <mesh>
            <gridHelper position={[0, 0, 0]} rotation={props.rotation} />
            <group position={positions[props.axis] as Vector3}>
                <Html
                    transform={true}
                    style={{ userSelect: "none", color: "black" }}
                >
                    {props.axis}
                </Html>
            </group>
        </mesh>
    );
}

export function Grid() {
    return (
        <mesh>
            <GridAxis rotation={[0, 0, 0]} axis="X" />
            <GridAxis rotation={[Math.PI / 2, 0, 0]} axis="Y" />
            <GridAxis rotation={[0, Math.PI, Math.PI / 2]} axis="Z" />
        </mesh>
    );
}
