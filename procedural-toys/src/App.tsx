import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import "./style/index.scss";
import { LimiterVisualizer } from "./toys/limiter-visual/LimiterVisualizer";

function App() {
    return (
        <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LimiterVisualizer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
