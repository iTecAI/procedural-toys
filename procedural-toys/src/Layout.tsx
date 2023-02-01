import { AppBar, Button, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="layout-root">
            <AppBar className="tabs">
                <Toolbar>
                    <Button>Limiter Designer</Button>
                </Toolbar>
            </AppBar>
            <div className="layout-content">
                <Outlet />
            </div>
        </div>
    );
}
