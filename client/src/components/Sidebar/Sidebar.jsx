import { styled } from '@mui/material/styles'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import blueLogo from '../../assets/blueLogo.png'
import redLogo from '../../assets/redLogo.png'
import { categoriesStub } from '../../stubs/movieCategories.stub';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/MOVIEAPI';
import genreIcons from '../../assets/genres';

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    padding: 10% 0;
`;

const StyledImg = styled('img')`
    width: 70%;
`;

const StyledMovieListLink = styled(Link)`
    ${'' /* color: white; */}
    text-decoration: none;
`;

const StyledLoadingBox = styled(Box)`
    display: flex;
    justify-content: center;
`;

const StyledGenreImg = styled('img')`
    ${'' /* filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)'; */}
    filter: brightness(0) invert(1);
`;


export const Sidebar = ({ setToggleMobile, open }) => {
    console.log(open);
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory )

    const dispatch = useDispatch();
    const { data: genreList, isFetching: isGenreListFetching } = useGetGenresQuery();

    return (
        <>
            {/* <StyledLink to="/">
                <StyledImg 
                    title="Movie App"
                    src={ theme.palette.mode === 'light' ? redLogo : blueLogo }
                    alt="Movie APP Logo"
                />
            </StyledLink> */}
            <List>
                <ListSubheader>Categories</ListSubheader>
                {
                    categoriesStub.map(({ label,value }) => (
                        <StyledMovieListLink key={value} to="/movies" color='inherit'>
                            <ListItemButton
                                onClick={() => dispatch(selectGenreOrCategory(value))}
                                button
                            >
                                <ListItemIcon>
                                    <StyledGenreImg src={genreIcons[label.toLowerCase()]} height={30}/>
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </StyledMovieListLink>
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
                            <StyledMovieListLink key={name} to="/movies">
                                <ListItemButton
                                    onClick={() => dispatch(selectGenreOrCategory(id))}
                                    button
                                >
                                    <ListItemIcon>
                                        <StyledGenreImg src={genreIcons[name.toLowerCase()]} height={30}/>
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </StyledMovieListLink>
                        ))
                    
                }
            </List>

        </>
    )
}
