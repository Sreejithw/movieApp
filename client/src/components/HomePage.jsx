import { Box} from '@mui/material';
import { Movies } from './Movies/Movies';
import {styled} from '@mui/material';
import useVoiceAI from '../VoiceAI';
import { useRef } from 'react';

const StyledHomePageContainer = styled('div')`
  height:100%;
`

const HomePage = () => {
  
  useVoiceAI();

  const voiceAIRef = useRef();
  
  return (
    <StyledHomePageContainer>
      <Box
          component="main"
          sx={{ 
            flexGrow: 1,
            p: 3,
          }}
        >
        <Movies />
      </Box>
      <div ref={voiceAIRef} />
    </StyledHomePageContainer>
  )
}

export default HomePage;
