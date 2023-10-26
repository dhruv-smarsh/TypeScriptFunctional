import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import React from "react";
import Analytics from "./pages/Analytics";
import FileManager from "./pages/FileManager";
import DashBoard from "./pages/DashBoard";

export default function AppRouting() {
    return (
        <>
                <Routes>
                    <Route path={`*`} element={<Navigate replace  to="/dashboard"/>}/>
                    <Route path={`dashBoard`} element={<DashBoard/>}/>
                    <Route path={`/analytics`} element={<Analytics/>}/>
                    <Route path={`/displayData`} element={<FileManager/>}/>
                </Routes>
        </>
    )
}
