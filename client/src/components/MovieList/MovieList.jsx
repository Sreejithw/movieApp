import Movie from "../Movie/Movie";
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'

const StyledGrid = styled(Grid)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    margin: 10px 0;
    gap: 1rem;
`;

export const MovieList = ({ movies, movieListLimit, excludeFirst }) => {
    const startIndex = excludeFirst ? 1 : 0;
    return (
        <StyledGrid container>
            {
                movies.results?.slice(startIndex, movieListLimit).map((movie, index) => (
                    <Movie key={index} movie={movie} index={index} />
                ))
            }
        </StyledGrid>
    )
}
