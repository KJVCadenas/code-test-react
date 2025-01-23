import React, { useEffect, useState } from 'react';
import LaunchList from './components/LaunchList';
import { Box, Typography } from '@mui/material';
import './assets/scss/styles.scss'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h1">SpaceX Missions</Typography>
        <LaunchList searchTerm={searchTerm} />
      </Box>
  );
}

export default App;