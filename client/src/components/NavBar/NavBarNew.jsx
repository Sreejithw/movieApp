import { AppBar, Avatar, Box, Button, CircularProgress, CssBaseline, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography, styled } from "@mui/material"
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { categoriesStub } from "../../stubs/movieCategories.stub";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import genreIcons from '../../assets/genres'
import { useGetGenresQuery } from "../../services/MOVIEAPI";
import Search from "../Search/Search";
import movieHubLogo from '../../assets/MovieHub_transparent.png';
import { setUser, userSelector } from "../../features/auth";
import { AccountCircle } from "@mui/icons-material";
import { createSessionId, fetchToken, moviesApi } from "../utils";
import avatar from '../../assets/avatar.png';

const drawerWidth = 300;

const StyledLogoBox= styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLoadingBox = styled(Box)`
    display: flex;
    justify-content: center;
`;

const StyledGenreImg = styled('img')`
    ${'' /* filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)'; */}
    filter: brightness(0) invert(1);
`;
const StyledLogoImg = styled('img')`
    height: auto;
    width: auto;
    max-height: 72px;
    max-width: 250px;
`;

const StyledAccountToolBar = styled(Toolbar)`
    justify-content: center;
`

const StyledAccountBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 0'
}));

const NavBarNew = () => {
    const dispatch = useDispatch();
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { isAuthenticated, user } = useSelector(userSelector);
    const token = localStorage.getItem('request_token');
    const sessionIdLocal = localStorage.getItem('session_id');
    const { data: genreList, isFetching: isGenreListFetching } = useGetGenresQuery();

    useEffect(() => {
        const loginUser = async() => {
          if(token){
              if(sessionIdLocal){
                  const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdLocal}`);
                  dispatch(setUser(userData));
              } else {
                  const sessionId = await createSessionId();
                  console.log(sessionId);
                  const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
                  dispatch(setUser(userData));
              }
          }
        }
  
        loginUser();
      }, []);  
    
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
        
          <StyledAccountToolBar>
            { !isAuthenticated ? (
                <StyledAccountBox>
                    <AccountCircle />
                    <Button variant="outlined" color="primaryText" onClick={() => {fetchToken()}}>
                        Login
                    </Button>
                </StyledAccountBox>
            ) : (
                <StyledAccountBox>
                    <Avatar alt="Profile" src={avatar}/>
                    {user?.username}
                    <Button
                        variant="outlined"
                        color="primaryText"
                        component= {Link}
                        to={`/profile/${user.id}`}
                        onClick={() => {}}
                    >
                        View Profile
                    </Button>
                </StyledAccountBox>
            )}
          </StyledAccountToolBar>
          <Divider />
          <List>
            <ListSubheader>Categories</ListSubheader>
            {
                categoriesStub.map(({ label,value }) => (
                    <Link key={value} to="/movies" color='inherit'>
                        <ListItemButton
                            onClick={() => dispatch(selectGenreOrCategory(value))}
                            button
                        >
                            <ListItemIcon>
                                <StyledGenreImg src={genreIcons[label.toLowerCase()]} height={30}/>
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </Link>
                ))
            }
          </List>
          <Divider />
          <List>
            <ListSubheader>Genres</ListSubheader>
            {
              isGenreListFetching ? (
                  <StyledLoadingBox>
                      <CircularProgress />
                  </StyledLoadingBox>
              ) : genreList.genres.map(({name, id}) => (
                  <Link key={name} to="/movies">
                      <ListItemButton
                          onClick={() => dispatch(selectGenreOrCategory(id))}
                          button
                      >
                          <ListItemIcon>
                              <StyledGenreImg src={genreIcons[name.toLowerCase()]} height={30}/>
                          </ListItemIcon>
                          <ListItemText primary={name} />
                      </ListItemButton>
                  </Link>
              ))
            }
          </List>
        </div>
      );

    return (
        <>
            {/* <NavBar /> */}
        <Box>
            <CssBaseline />
            <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
            >
            <Toolbar sx={{ gap: '4rem !important' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <StyledLogoBox>
                    <StyledLogoImg src={movieHubLogo} alt="MovieHub"/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MovieHub
                    </Typography>
                </StyledLogoBox>
                <Typography variant="h6" noWrap component="div">
                    <Search />
                </Typography>
            </Toolbar>
            </AppBar>
        </Box>
        <Box
            component="main"
        >
            <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
            open
            >
            {drawer}
            </Drawer>
        </Box>
        </>
    )
}

export default NavBarNew