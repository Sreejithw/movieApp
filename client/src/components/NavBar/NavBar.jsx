// import styled from "@emotion/styled";
import { AppBar, Toolbar, IconButton, Button, Drawer, Avatar, useMediaQuery, Icon, Paper, Divider } from "@mui/material";
import { Menu, AccountCircle, Brightness4, Brightness7, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import avatar from '../../assets/avatar.png';
import { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { createSessionId, fetchToken, moviesApi } from "../utils";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";

const drawerWidth = 240;
const StyledToolBar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    height: 80px;
`;

const StyledIconButton = styled(IconButton)`
    color: #fff;
    outline: none;
    margin-right: 2px;
`;

const StyledBrightnessIconButton = styled(IconButton)`
    color: #fff;
    margin-left: 1;
`;

const StyledLinkButton = styled(Button)`
    &:hover: {
        color: white !important;
        text-decoration: none;

    }
`;

const StyledAvatar = styled(Avatar)`
    width: '30px';
    height: '30px'
`;

const StyledLoginButton =  styled(Button)`
    color: white;
`;

const StyledProfileLabel = styled('p')`
    color: white;
`;


/** New Styled components for the drawer goes her */
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// const StyledNav = styled.nav(({theme}) => ({
//     [theme.breakpoints.up("sm")]: {
//         width: '240px',
//         flexShrink: '0'
//     }
// }));

// const StyledNav = styled.nav`
//     width: 240px;
//     flex-shrink: 0;
// `;

const StyledDrawerPaper = styled(Paper)`

`;

export const NavBar = () => {
    const { isAuthenticated, user } = useSelector(userSelector);
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [toggleMobile, setToggleMobile] = useState(false);
    
    const [open, setOpen] = useState(false);

    const token = localStorage.getItem('request_token');
    const sessionIdLocal = localStorage.getItem('session_id');
    const drawerWidth = 300;

    useEffect(() => {
      const loginUser = async() => {
        if(token){
            if(sessionIdLocal){
                const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdLocal}`);
                dispatch(setUser(userData));
            } else {
                const sessionId = await createSessionId();
                const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
                dispatch(setUser(userData));
            }
        }
      }

      loginUser();
    }, [token]);

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
    return (
        <div>
            <AppBar position="static">
                <StyledToolBar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <Menu />
                </IconButton>
                    {/* { isMobile && (
                        <StyledIconButton
                            edge='start'
                            onClick={() => setToggleMobile((prevToggleMobile) => !prevToggleMobile )}
                        >
                            <Menu />
                        </StyledIconButton>
                    )} */}
                    <StyledBrightnessIconButton onClick={() => {}}>
                        { theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
                    </StyledBrightnessIconButton>
                    { !isMobile && <Search />}
                    <div>
                        { !isAuthenticated ? (
                            <StyledLoginButton onClick={() => {fetchToken()}}>
                                Login &nbsp; <AccountCircle />
                            </StyledLoginButton>
                        ) : (
                            <StyledLinkButton
                                component= {Link}
                                to={`/profile/${user.id}`}
                                onClick={() => {}}
                            >
                                {!isMobile && <StyledProfileLabel>My Movies &nbsp;</StyledProfileLabel>}
                                <StyledAvatar alt="Profile" src={avatar}/>
                            </StyledLinkButton>
                        )}
                    </div>
                    { isMobile && <Search />}
                </StyledToolBar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    "& ::-webkit-scrollbar": {
                        width: "6px"
                    },
                    "& ::-webkit-scrollbar-track": {
                        backgroundColor: "#f5f5f5"
                    },
                    "& ::-webkit-scrollbar-thumb": {
                        borderRadius: "10px",
                        boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                        backgroundColor: "#f5f5f5"
                    }
                    }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Sidebar setToggleMobile={setToggleMobile} open={open}/>
            </Drawer>
            {/* <div>
                <nav>
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            anchor="right"
                            open={toggleMobile}
                            ModalProps={{ keepMounted: true }}
                            classes={<Paper />}
                            onClose={() => setToggleMobile((prevToggleMobile) => !prevToggleMobile )}
                        >
                            <Sidebar setToggleMobile={setToggleMobile} />
                        </Drawer>
                    ): (
                        <Drawer
                             classes={{Paper}}
                             variant="persistent"
                             sx={{
                                    width: 240,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        width: drawerWidth,
                                        boxSizing: 'border-box',
                                    },
                            }}
                             open
                        >
                            <Sidebar setToggleMobile={setToggleMobile} />
                        </Drawer>
                    )}
                </nav>
            </div> */}
        </div>
    )
}
