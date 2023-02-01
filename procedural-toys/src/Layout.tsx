import { AppBar, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <Box className="layout-root">
            <AppBar className="tabs" />
            <Box className="layout-content">
                <Outlet />
            </Box>
        </Box>
    );
}
