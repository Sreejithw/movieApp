
import { Modal, Typography,Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating, DialogContent } from "@mui/material";
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import axios from 'axios';
import { useGetMovieQuery, useGetRecommendationsQuery } from "../../services/MOVIEAPI";
import { styled } from '@mui/material/styles';
import genreIcons from '../../assets/genres';
import { MovieList } from "../MovieList/MovieList";
import { useState } from "react";

const StyledLoadingBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center
`;

const StyledMovieInfoBox = styled(Box)`
  display: flex;
  justify-content: center;
`;

const StyledMovieContainer = styled(Grid)`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
  [theme.breakpoints.down('sm'))]: {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const StyledMovieImage = styled('img')`
  box-shadow: 0.5em 1em 1em rgb(64, 64, 70);
  width: 80%;
  [theme.breakpoints.down('md'))]: {
    margin: 0 auto;
    width: 50%;
    height: 350px;
  }
  [theme.breakpoints.down('sm'))]: {
    margin: 0 auto;
    width: 100%;
    height: 350px;
    margin-bottom: 30px;
  },
`;

const StyledGenreImage = styled('img')`
  filter: theme.palette.mode === 'dark' && invert(1);
  margin-right: 10px;
`;

const StyledGenreContainer = styled(Grid)`
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const StyledCastImage = styled('img')`
  width: 100%;
  max-width: 7em;
  height: 8em;
  object-fit: cover;
`;


const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  [theme.breakpoints.down('sm'))]: {
    padding: 0.5rem 1rem;
  },
`;

const StyledButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  [theme.breakpoints.down('sm'))]: {
    flex-direction: column
  },
`;

const StyledTrailerModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMovieIframe = styled('iframe')`
  width: 50%;
  height: 50%;
  border: 0px;
  [theme.breakpoints.down('sm'))]: {
    width: 90%;
    height: 90%;
  },
`

const MovieInfoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: movieRecommendationData, isFetching: isMovieRecommendationsFetching } = useGetRecommendationsQuery({ movie_id: id, list: '/recommendations'})
  const [open, setOpen] = useState(false);
  const isMovieSetToFavourite = true;
  const isMovieAddedToWatchlist = true;
  
  const addToFavourites = () => {
    
  }
  const addToWatchList = () => {
    
  }

  if(isFetching){
    return (
      <StyledLoadingBox>
        <CircularProgress size="8rem" />
      </StyledLoadingBox>
    )
  }

  if(error){
    return (
      <StyledLoadingBox>
        <Link to="/">Something has gone wrong - Go back to home</Link>
      </StyledLoadingBox>
    )
  }

  // console.log(data?.genres);
  return (
    <StyledMovieContainer container>
      <Grid item sm={12} lg={4}>
        <StyledMovieImage 
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} &nbsp;
          ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <StyledMovieContainer item>
          <StyledMovieInfoBox>
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{marginLeft: '10px'}}>
              {data?.vote_average} / 10
            </Typography>
          </StyledMovieInfoBox>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0]?.name}
          </Typography>
        </StyledMovieContainer> 
        <StyledGenreContainer item>
          {data?.genres?.map((genre, i) => (
            <StyledLink key={genre.name} to={"/movies"} onClick={() => dispatch(selectGenreOrCategory(genre?.id))}>
              <StyledGenreImage src={genreIcons[genre.name.toLowerCase()]} height={30}/>
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </StyledLink>
          ))}
        </StyledGenreContainer>
          <Typography variant="h5" gutterBottom style={{ marginTop: '10px'}}>
            Overview
          </Typography>
          <Typography style={{ marginTop: '2rem'}}>
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Top Casts
          </Typography>
          <Grid item container spacing={2}>
            { data && data?.credits?.cast?.map((character, i) => (
              character.profile_path && <Grid key={i} item xs={4} md={2} component={Link} to={`/cast/${character.id}`} style={{ textDecoration: 'none'}}>
                <StyledCastImage src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">{character?.character}</Typography>
              </Grid>
            )).slice(0, 6)}
          </Grid>
          <Grid item container style={{marginTop: '2rem'}}>
            <StyledButtonsContainer>
              <StyledButtonsContainer as={Grid} item xs={12} sm={6}>
                <ButtonGroup size="small" variant="outlined">
                  <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                  <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                  <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                </ButtonGroup>
              </StyledButtonsContainer>
              <StyledButtonsContainer as={Grid} item xs={12} sm={6}>
                <ButtonGroup size="small" variant="outlined">
                  <Button onClick={addToFavourites} endIcon={isMovieSetToFavourite ? <FavoriteBorderOutlined /> : <Favorite />}>
                    {isMovieSetToFavourite ? 'Unfavourite' : 'Favourite'}
                  </Button>
                  <Button onClick={addToWatchList} endIcon={isMovieAddedToWatchlist ? <Remove /> : <PlusOne />}>
                    {isMovieAddedToWatchlist ? 'Remove' : 'Watchlist'}
                  </Button>
                  <Button endIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}}>
                    <Typography component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                  </Button>
                </ButtonGroup>
              </StyledButtonsContainer>
            </StyledButtonsContainer>
          </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
         <Typography variant="h3" gutterBottom align="center">
              If you like {data?.title}, You might also like
         </Typography>
         {
          movieRecommendationData
          ? <MovieList movies={movieRecommendationData} movieListLimit={12} />
          : <Box>Sorry, nothing was found</Box>
         }
      </Box>
      <StyledTrailerModal 
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        >
        <DialogContent>
          { data?.videos?.results?.length > 0 && (
            <StyledMovieIframe 
              autoPlay
              title="Trailer"
              src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
              allow="autoplay"
            />
          )}
        </DialogContent>
      </StyledTrailerModal>
    </StyledMovieContainer>
  )
}

export default MovieInfoPage;