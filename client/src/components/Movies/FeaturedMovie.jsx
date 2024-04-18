import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles'

const StyledFeaturedMovieBox = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  height: '490px',
  textDecoration: 'none'
});

const StyledFeaturedMovieCard = styled(Card)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  "&": {
    position: 'relative',
  }
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.575)',
  backgroundBlendMode: 'darken'
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  color: '#fff',
  width: '40%',
  [theme.breakpoints.up("sm")]: {
    width: '100%'
  },
  "&": {
    position: 'relative',
    backgroundColor: 'transparent'
  }
}));

const FeaturedMovie = ({movie}) => {
  if(!movie) return null;

  return (
    <StyledFeaturedMovieBox component={Link} to={`/movie/${movie.id}`}>
      <StyledFeaturedMovieCard> 
        <StyledCardMedia 
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
        />
        <Box padding="20px">
          <StyledCardContent>
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </StyledCardContent>
        </Box>
      </StyledFeaturedMovieCard>
    </StyledFeaturedMovieBox>
  )
}

export default FeaturedMovie