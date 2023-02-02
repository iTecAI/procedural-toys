import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { InputAdornment, TextField } from "@mui/material";
import { Controls } from "../../components/controls/Controls";
import { useEffect, useState } from "react";
import { parseEquation } from "../../utils/parseEquation";
import { rcoord } from "../../utils/randomCoordinate";
import { isEqual } from "lodash";
import { Grid } from "../../components/grid/Grid";

function ProbPlot(props: {
    count: number;
    threshold: number;
    scale: number;
    xf: Function;
    yf: Function;
    zf: Function;
}) {
    const [positions, setPositions] = useState<[number, number, number][]>([]);
    const [last, setLast] = useState<any>({});

    useEffect(() => {
        if (isEqual(props, last)) {
            return;
        }
        setLast({ ...props });
        const newPositions: [number, number, number][] = [];
        for (let i = 0; i < props.count; i++) {
            const c = rcoord(props.scale, 3) as [number, number, number];
            const probs = [props.xf(c[0]), props.yf(c[1]), props.zf(c[2])];
            if (
                Math.abs(1 * probs[0] * probs[1] * probs[2]) >= props.threshold
            ) {
                newPositions.push(c);
            }
        }
        setPositions(newPositions);
    }, [props]);

    const ACube = Box as any;

    return (
        <group>
            {positions.map((p) => (
                <mesh key={p.toString()}>
                    <ACube position={p} scale={0.05} material-color="hotpink">
                        <meshStandardMaterial color="hotpink" />
                    </ACube>
                </mesh>
            ))}
        </group>
    );
}

export function LimiterVisualizer() {
    const [controls, setControls] = useState({
        xEquation: "1",
        yEquation: "1",
        zEquation: "1",
        scale: "6",
        threshold: "0.8",
    });

    const [intcontrols, setIntcontrols] = useState({
        xEquation: "1",
        yEquation: "1",
        zEquation: "1",
        scale: "6",
        threshold: "0.8",
    });

    /* eslint-disable */
    const [functions, setFunctions] = useState<{
        x: Function;
        y: Function;
        z: Function;
    }>({
        x: new Function("v", "return 1"),
        y: new Function("v", "return 1"),
        z: new Function("v", "return 1"),
    });
    /* eslint-enable */

    useEffect(() => {
        setFunctions({
            x: parseEquation(controls.xEquation),
            y: parseEquation(controls.yEquation),
            z: parseEquation(controls.zEquation),
        });
    }, [controls]);

    return (
        <>
            <Canvas
                camera={{ position: [2, 2, 10], fov: 80 }}
                frameloop="demand"
                style={{ zIndex: 99 }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[-10, 10, -10]} />
                <OrbitControls enablePan={false} enableZoom maxZoom={0.01} />
                <Grid />
                <ProbPlot
                    count={1000}
                    scale={Number.parseFloat(controls.scale)}
                    threshold={Number.parseFloat(controls.threshold)}
                    xf={functions.x}
                    yf={functions.y}
                    zf={functions.z}
                />
            </Canvas>
            <Controls
                value={intcontrols}
                onChange={setIntcontrols}
                onSubmit={setControls}
            >
                <TextField
                    label="X Equation"
                    name="xEquation"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                Px =
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Y Equation"
                    name="yEquation"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                Py =
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Z Equation"
                    name="zEquation"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                Pz =
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Scale"
                    name="scale"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                S =
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Threshold"
                    name="threshold"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                T =
                            </InputAdornment>
                        ),
                    }}
                />
            </Controls>
        </>
    );
}
