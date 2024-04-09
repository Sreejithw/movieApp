import { Box} from '@mui/material';
import { Movies } from './Movies/Movies';
import {styled} from '@mui/material';

const StyledHomePageContainer = styled('div')`
  height:100%;
`

const drawerWidth = 300;

const HomePage = () => {
  return (
    <StyledHomePageContainer>
      <Box
          component="main"
          sx={{ 
            flexGrow: 1,
            p: 3,
            width: { 
              // sm: `calc(100% - ${drawerWidth}px)`,
            } 
          }}
        >
        {/* <Toolbar /> */}
        <Movies />
      </Box>
    </StyledHomePageContainer>
  )
}

export default HomePage;
