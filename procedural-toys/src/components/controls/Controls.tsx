import { Button, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { isEqual } from "lodash";
import { Children, cloneElement, ReactNode, useEffect, useState } from "react";

export function Controls<T = any>(props: {
    value: T;
    onChange: (value: T) => void;
    onSubmit: (value: T) => void;
    children: ReactNode[] | ReactNode;
}) {
    const [val, setVal] = useState<Partial<T>>(props.value);
    useEffect(() => {
        if (!isEqual(val, props.value)) {
            setVal(props.value);
        }
    }, [val, props]);
    return (
        <Paper className="controls">
            <Stack spacing={2}>
                {Children.map(props.children, (child) => {
                    if (
                        child &&
                        Object.keys(child).includes("props") &&
                        Object.keys((child as any).props).includes("name")
                    ) {
                        return cloneElement(child as any, {
                            value: (val as any)[(child as any).props.name],
                            onChange: (event: any) =>
                                props.onChange({
                                    ...val,
                                    [(child as any).props.name]:
                                        event.target.value,
                                } as any),
                        });
                    } else {
                        return child;
                    }
                })}
                <Button
                    variant="contained"
                    onClick={() => props.onSubmit(val as T)}
                >
                    Submit
                </Button>
            </Stack>
        </Paper>
    );
}
