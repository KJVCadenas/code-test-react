import React, { useState } from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (

    <TextField
      id="outlined-basic"
      label="Search for a mission..."
      variant="outlined"
      value={query}
      onChange={handleInputChange}
      fullWidth
      sx={{mt:"10px", mb:"10px"}}
    />

  );
};

export default SearchBar;