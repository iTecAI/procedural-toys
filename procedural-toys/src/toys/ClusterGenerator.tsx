import { Grid } from "../components/grid/Grid";
import {
    Box as _Box,
    Instance,
    Instances,
    Merged,
    OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { ClusterParameters, generateCluster } from "../generators/cluster";
import { Stack } from "@mui/system";
import * as THREE from "three";

const Box: any = _Box;

function GeneratorRenderer(props: ClusterParameters) {
    const points = generateCluster(props);
    return (
        <Instances>
            <boxGeometry />
            <meshStandardMaterial />
            {points.map((pos) => (
                <Instance color="hotpink" position={pos} scale={0.05} />
            ))}
        </Instances>
    );
}

export function ClusterGenerator() {
    // Generic
    const [mode, setMode] = useState<ClusterParameters["type"]>("sphere");
    const [seed, setSeed] = useState<number>(0);
    const [count, setCount] = useState<number>(100);

    // Sphere params
    const [radius, setRadius] = useState<number>(4);
    const [uniform, setUniform] = useState<boolean>(false);

    const [params, setParams] = useState<ClusterParameters>({
        type: "sphere",
        seed: 0,
        count: 100,
        radius: 4,
        uniform: false,
    });

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
                <GeneratorRenderer {...params} />
            </Canvas>
            <Paper className="controls">
                <Stack spacing={2}>
                    <FormControl>
                        <InputLabel id="cluster-mode-select">Mode</InputLabel>
                        <Select
                            labelId="cluster-mode-select"
                            fullWidth
                            label="Mode"
                            value={mode}
                            onChange={(event) =>
                                setMode(event.target.value as any)
                            }
                        >
                            <MenuItem value={"sphere"}>Sphere</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Seed"
                        value={seed.toString()}
                        onChange={(event) =>
                            setSeed(Number.parseInt(event.target.value) || 0)
                        }
                    />
                    <TextField
                        label="Elements"
                        value={count.toString()}
                        onChange={(event) =>
                            setCount(
                                Math.abs(
                                    Number.parseInt(event.target.value) || 0
                                )
                            )
                        }
                    />
                    {mode === "sphere" && (
                        <>
                            <TextField
                                label="Radius"
                                value={radius.toString()}
                                onChange={(event) =>
                                    setRadius(
                                        Math.abs(
                                            Number.parseInt(
                                                event.target.value
                                            ) || 0
                                        )
                                    )
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={uniform}
                                        onClick={() => setUniform(!uniform)}
                                    />
                                }
                                label="Uniform"
                            />
                        </>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => {
                            switch (mode) {
                                case "sphere":
                                    setParams({
                                        type: "sphere",
                                        seed,
                                        count,
                                        radius,
                                        uniform,
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Stack>
            </Paper>
        </>
    );
}
