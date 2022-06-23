import { AppBar, Toolbar } from "@mui/material";
import React from "react";

export default function Header(props) {

    
    const showHeader = () => {
        return <Toolbar>Cocktails</Toolbar>
    }

    return (
        <header>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>{showHeader()}</AppBar>
        </header>
    )
}