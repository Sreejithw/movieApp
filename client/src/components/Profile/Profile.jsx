import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Typography, Button, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { styled } from '@mui/material/styles'

const StyledUserBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const Profile = () => {
  const { user } = useSelector(userSelector);
  const favourireMovies = [];

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <Box>
      <StyledUserBox>
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logoutUser}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </StyledUserBox>
      { !favourireMovies.length
      ? <Typography variant="h5">Add some of your favourite movies</Typography>
      : <Box>
          Favourite Movies
      </Box>
      }
    </Box>
  )
}
