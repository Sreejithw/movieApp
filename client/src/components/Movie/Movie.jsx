import { Typography, Grid, Grow, Tooltip, Rating, CardActionArea, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles'


const StyledGrid = styled(Grid)`
    padding: 10px;
`;

const StyledTyporaphy = styled(Typography)`
    color: theme.palette.text.primary;
    text-overflow: ellipsis;
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 0;
    text-align: center;
`;

const StyledLink = styled(Link)`
    align-items: center;
    font-weight: bolder;
    text-decoration: none;
    '&:hover': {
       cursor: pointer;
    }
`;

const StyledImg = styled('img')`
    height: 300px;
    margin-bottom: 10px;
    '&:hover': {
        transform: scale(1.04);
    }
`;

const StyldeMovieCardContent = styled(CardContent)(() => ({
    backgroundColor: "#203f52"
}));

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

const StyldeMovieCardActionArea = styled(CardActionArea)(() => ({
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
}));

const StyledMovieCard = styled(Card)(() => ({
    // minWidth: 256,
    // borderRadius: 16,
    // boxShadow: "none",
    // "&:hover": {
    // //   boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
    // },
}));
  
const StyledMovieTitle = styled(Typography)(() => ({
    // fontFamily: "Keania One",
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
                {/* <StyledMovieCard> */}
                    <StyledCardMedia
                        image={movie.poster_path ? 
                                        `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :
                                        `https://www.fillmurray.com/200/300`}
                        // sx={{
                        //     width: "100%",
                        //     // maxWidth: "50%",
                        //     height: 0,
                        //     paddingBottom: "75%",
                        //     backgroundColor: "rgba(0,0,0,0.08)",
                        // }}
                    />
                {/* </StyledMovieCard> */}
                <Content>
                    <StyledMovieTitle variant={"h5"}>{movie.title}</StyledMovieTitle>
                    <Tooltip disableTouchListener title={`${movie.vote_average} / 10` }>
                        <div>
                            <Rating size="small" readOnly value={movie.vote_average / 2} precision={0.1} /> 
                        </div>
                    </Tooltip>
                </Content>
            </StyledCard>
            {/* <Grow in={true} timeout={ (index + 1) * 250}>
                <StyledLink to={`/movie/${movie.id}`}>
                    {
                        <StyledImg 
                            alt={movie.title} 
                            src={ movie.poster_path ? 
                                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :
                                    `https://www.fillmurray.com/200/300`
                            }
                        />
                    }
                    <StyledTyporaphy variant="h5">
                        { movie.title }
                    </StyledTyporaphy>
                    <Tooltip disableTouchListener title={`${movie.vote_average} / 10` }>
                        <div>
                            <Rating readOnly value={movie.vote_average / 2} precision={0.1} /> 
                        </div>
                    </Tooltip>
                </StyledLink>
            </Grow> */}
        </StyledGrid>
    )
}

export default Movie;