import React, { Component } from 'react'
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppRouting from "../AppRouting";
import {CSSObject, styled, Theme} from "@mui/material/styles";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import {Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const routes = [
    {
        path: "/dashboard",
        name: "DashBoard",
        pathname: "dashBoard",
        icon: <HomeIcon/>
    },
    {
        path: "/analytics",
        name: "Messages",
        pathname: "analytics",
        icon: <HomeIcon/>
    },
    {
        path: "/orders",
        name: "Orders",
        pathname: "orders",
        icon: <HomeIcon/>
    },
    {
        path: "/news",
        name: "News",
        pathname: "nes",
        icon: <HomeIcon/>
    },
    {
        path: "/data",
        name: "data",
        pathname: "Data",
        icon: <HomeIcon/>
    },
];

export class SideMenu2 extends Component<any,any> {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
        }
    }

     handleDrawerOpen = () => {
        this.setState({
            open: true
        })
    };

     handleDrawerClose = () => {
         this.setState({
             open: false
         })
    };

  render() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={this.state.open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(this.state.open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Mini variant drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={this.state.open}>
                    <DrawerHeader>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.state.open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {routes.map((text, index) => (
                            <Link to={text.path} key={text.pathname}>
                            <ListItem className={`link ${window.location.pathname === text.path ? `active` : ''}`}   key={text.pathname} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: this.state.open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: this.state.open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.pathname} sx={{ opacity: this.state.open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <AppRouting/>
                </Box>
            </Box>
        </>
    )
  }
}

export default SideMenu2
