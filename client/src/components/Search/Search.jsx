import { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import { TextField, InputAdornment, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles'
import { searchMovie } from "../../features/currentGenreOrCategory";

const StyledSearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '2rem',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));
  

const StyledInputProps = styled('div')(({ theme }) => ({
    color: theme.palette.mode === 'light' && 'black',
    filter: theme.palette.mode === 'light' && 'invert(1)',
    [theme.breakpoints.down('sm')]: {
        marginTop: '-10px',
        marginBottom: '10px'
    },
}));

const Search = () => {

    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            dispatch(searchMovie(query));
        }
    };
    
    return (
        <StyledSearchContainer>
            {/* <TextField 
                onKeyPress={handleKeyDown}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    // inputComponent: StyledInputProps,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            /> */}
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onKeyDown={handleKeyDown}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
        </StyledSearchContainer>
    )
}

export default Search