import { Typography, Grid, Tooltip, Rating, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles'


const StyledGrid = styled(Grid)`
    padding: 10px;
`;

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

const StyledMovieTitle = styled(Typography)(() => ({
    fontSize: "1rem",
    color: "#fff",
    textTransform: "uppercase",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}));

const Content = styled("div")(({ theme }) => ({
    position: 'absolute',
    padding: theme.spacing(3, 2),
    zIndex: 2,
    bottom: 0,
    width: "100%",
}));


const Movie = ({movie, index}) => {
    return (
        <StyledGrid item xs={10} sm={12} md={5} lg={3} xl={2}>
            <StyledCard component={Link} to={`/movie/${movie?.id}`}>
                    <StyledCardMedia
                        image={movie.poster_path ? 
                                        `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :
                                        `https://www.fillmurray.com/200/300`}
                    />
                <Content>
                    <StyledMovieTitle variant={"h5"}>{movie.title}</StyledMovieTitle>
                    <Tooltip disableTouchListener title={`${movie.vote_average} / 10` }>
                        <div>
                            <Rating size="small" readOnly value={movie.vote_average / 2} precision={0.1} /> 
                        </div>
                    </Tooltip>
                </Content>
            </StyledCard>
        </StyledGrid>
    )
}

export default Movie;