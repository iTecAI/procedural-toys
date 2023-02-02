import { AppBar, Button, Toolbar } from "@mui/material";
import { Stack } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";

export function Layout() {
    const nav = useNavigate();
    return (
        <div className="layout-root">
            <AppBar className="tabs">
                <Toolbar>
                    <Stack spacing={1} direction="row">
                        <Button onClick={() => nav("/")}>
                            Limiter Designer
                        </Button>
                        <Button onClick={() => nav("/cluster")}>
                            Cluster Generator
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <div className="layout-content">
                <Outlet />
            </div>
        </div>
    );
}
