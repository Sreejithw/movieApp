import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Typography, Button, Box, Card, Tooltip, Rating, CardMedia, Grid } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { styled } from '@mui/material/styles'
import { useGetYourMovieListQuery } from "../../services/MOVIEAPI";
import { Link } from "react-router-dom";


const StyledContainerGrid = styled(Grid)`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin: 10px 0;
    gap: 1rem;
`;

const StyledGrid = styled(Grid)`
    padding: 10px;
`;

const StyledUserBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledFavMovieListBox = styled(Box)({
  marginLeft: "1rem"
});

const StyledCard = styled(Card)({
  display: "block",
  borderRadius: "0",
  boxShadow: "none",
  position: "relative",
  minWidth: 200,
  minHeight: 360,
  transition: "0.2s",
  height:"100%",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "64%",
    bottom: 0,
    zIndex: 1,
    background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
  },
  "&:hover": {
      transform: "scale(1.1)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 0,
  backgroundPosition: "top",
});

const Content = styled("div")(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(3, 2),
  zIndex: 2,
  bottom: 0,
  width: "100%",
}));

const StyledMovieTitle = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "#fff",
  textTransform: "uppercase",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden"
}));

export const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: yourFavouriteMoviesList, refetch: refetchFavouriteMovies } = useGetYourMovieListQuery({ listName: 'favorite/movies', acc_id: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const { data: yourWatchlisteddMoviesList, refetch: refetchWatchlist } = useGetYourMovieListQuery({ listName: 'watchlist/movies', acc_id: user.id, sessionId: localStorage.getItem('session_id'), page: 1});

  useEffect(() => {
    refetchFavouriteMovies();
    refetchWatchlist();
  },[]);

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  const renderMovieListCard = (movieList) => {
      return (
        movieList?.results.map((movies, index) => (
          <>
            <StyledGrid item xs={10} sm={12} md={5} lg={3} xl={2}>
                <StyledCard component={Link} to={`/movie/${movies?.id}`}>
                        <StyledCardMedia
                            image={movies.poster_path ? 
                                            `https://image.tmdb.org/t/p/w500/${movies.poster_path}` :
                                            `https://www.fillmurray.com/200/300`}
                        />
                    <Content>
                        <StyledMovieTitle variant={"h5"}>{movies.title}</StyledMovieTitle>
                        <Tooltip disableTouchListener title={`${movies.vote_average} / 10` }>
                            <div>
                                <Rating size="small" readOnly value={movies.vote_average / 2} precision={0.1} /> 
                            </div>
                        </Tooltip>
                    </Content>
                </StyledCard>
            </StyledGrid>
          </>
        ))
      )
  }

  return (
    <Box>
      <StyledUserBox>
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logoutUser}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </StyledUserBox>
      { 
        !yourFavouriteMoviesList?.results?.length && !yourWatchlisteddMoviesList?.results?.length
        ? <Typography variant="h5">Add some of your favourite movies</Typography>
        : (
          <StyledFavMovieListBox>
            <Box>
              <Typography variant="h5" gutterBottom>Your Favourite</Typography>
              <StyledContainerGrid container>
                {renderMovieListCard(yourFavouriteMoviesList)}
              </StyledContainerGrid>
            </Box>
            <Box>
              <Typography variant="h5" gutterBottom>Watchlist</Typography>
              <StyledContainerGrid container>
                {renderMovieListCard(yourWatchlisteddMoviesList)}
              </StyledContainerGrid>
            </Box>
          </StyledFavMovieListBox>
        )
      }
    </Box>
  )
}
