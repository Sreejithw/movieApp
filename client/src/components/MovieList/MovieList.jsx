import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Movie from "../Movie/Movie";

const StyledGrid = styled(Grid)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: auto;
    gap: 1rem;
    height: 100%;
`;

export const MovieList = ({ movies, movieListLimit }) => {
    return (
        <StyledGrid container>
            {
                movies.results?.slice(0, movieListLimit).map((movie, index) => (
                    <Movie key={index} movie={movie} index={index} />
                ))
            }
        </StyledGrid>
    )
}
