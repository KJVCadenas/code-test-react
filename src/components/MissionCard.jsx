import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Collapse, Button, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const MissionCard = ({ mission }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggle = () => {
        setShowDetails(!showDetails);
    };

    const launchDate = new Date(mission.date);
    const timeAgo = formatDistanceToNow(launchDate, { addSuffix: true });

    const getStatusChip = () => {
        if (mission.upcoming) {
            return <Chip label="Upcoming" sx={{background:"#90caf9"}} />;
        } else if (mission.launch_success) {
            return <Chip label="Success" sx={{background:"#66bb6a"}}/>;
        } else {
            return <Chip label="Failed" sx={{background:"#f44336"}}/>;
        }
    };

    return (
        <Card sx={{ mt: '10px', mb: '10px' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
                    <Typography variant="h5" sx={{ mr: 2 }}>
                        {mission.name}
                    </Typography>
                    {getStatusChip()}
                </Box>
                <Collapse in={showDetails}>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: "5px", mb: "5px" }}>
                        {timeAgo} | <a href={mission.articleLink}>Article</a> | <a href={mission.videoLink}>Video</a>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box sx={{ width: '256px', height: '256px', flexShrink: 0 }}>
                            {mission.image ? (
                                <img src={mission.image} alt={mission.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid #ccc',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                >
                                    <Typography variant="body2" color="textSecondary">
                                        No Image Yet
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ ml: 2, maxHeight: '256px', overflow: 'auto', flexGrow: 1 }}>
                            <Typography variant="body2">
                                {mission.details || "No Mission Details Yet"}
                            </Typography>
                        </Box>
                    </Box>
                </Collapse>
                <Button sx={{mt: "10px"}} variant="contained" onClick={handleToggle}>
                    {showDetails ? 'HIDE' : 'SHOW'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default MissionCard;
