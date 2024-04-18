import { Box, CircularProgress, useMediaQuery, Typography} from '@mui/material'  ;
import { useState } from "react";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles'
import { useGetMoviesQuery } from "../../services/MOVIEAPI";
import { MovieList } from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import FeaturedMovie from "./FeaturedMovie";

const StyledMovieContainer = styled('div')`
    padding: 0 2rem;
    margin-top: 4rem;
`;

const StyledLoadingBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: baseline;
    z-index: 1
`;

const StyledErrorBox = styled(Box)`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;


export const Movies = () => {
    const [ page, setPage ]= useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory )
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

    const numberOfMovies = lg ? 14 : 19;

    if( isFetching){
        return (
            <StyledLoadingBox>
                <CircularProgress width="4rem" color="secondary"/>
            </StyledLoadingBox>
        )
    }
    
    if(!data.results.length){
        return (
            <StyledErrorBox>
                <Typography variant="h4">
                    No movies that match that name.
                    <br />
                    Please search for something else.
                </Typography>
            </StyledErrorBox>
        )
    }

    if(error) return 'An error has occured.'

    return (
        <StyledMovieContainer>
            <FeaturedMovie movie={data.results[0]}/>
            <MovieList movies={data} movieListLimit={numberOfMovies} excludeFirst/>
            <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
        </StyledMovieContainer>
    )
}
