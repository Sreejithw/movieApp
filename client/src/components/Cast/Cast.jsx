import { Box, Button, CircularProgress, Grid, Typography, styled } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from "@mui/icons-material";
import { useGetCastInfoQuery, useGetMoviesByActorNameQuery } from "../../services/MOVIEAPI";
import { MovieList } from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";

const StyledLoadingBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1
`;

const StyledImg = styled('img')`
  max-width: 50%;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0.5em 0.5em 1em;
`;

const StyledAboutInfoGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButtonBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem; 
`;


const Cast = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetCastInfoQuery(id);
  const { data: moviesByActorData, isFetching: isFetchingMoviesByActor } = useGetMoviesByActorNameQuery({id, page});
  console.log(moviesByActorData);
    
  if(isFetching){
      return (
          <StyledLoadingBox>
              <CircularProgress />
          </StyledLoadingBox>
      )
  }

  if(error) return 'An error has occured.'


  return (
      <div>
        <Grid container spacing={3}>
          <Grid item lg={5} xl={4}>
            <StyledImg 
              src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
              alt={data.name}  
            />
          </Grid>
          <StyledAboutInfoGrid item lg={7} xl={8}>
            <Typography variant="h2" gutterBottom>
              {data?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Born: {new Date(data?.birthday).toDateString()}
            </Typography>
            <Typography variant="body" gutterBottom paragraph>
              {data?.biography || 'No Info Found'}
            </Typography>
            <StyledButtonBox>
              <Button variant="contained" color="secondary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
                IMDB
              </Button>
              <Button color="secondary" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                Back
              </Button>
            </StyledButtonBox>
          </StyledAboutInfoGrid>
        </Grid>
        <Box margin='2rem 0'>
          <Typography variant="h2" gutterBottom align="center">Movies</Typography>
          { moviesByActorData && <MovieList movies={moviesByActorData} movieListLimit={12} />}
          <Pagination currentPage={page} setPage={setPage} totalPages={moviesByActorData?.total_pages}/>
        </Box>
      </div>
  )
}

export default Cast