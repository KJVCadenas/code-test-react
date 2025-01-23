import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v3/launches';

export const fetchLaunches = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${page * limit}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching SpaceX launches: ' + error.message);
  }
};