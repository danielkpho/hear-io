import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import { Button, Grid, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table } from "@mui/material";

export default function GlobalLeaderboard(){
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({key: null, direction: "ascending"})
    const navigate = useNavigate();

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
        // Sort the data array based on the selected key and direction
        const sortedData = [...data].sort((a, b) => {
          if (direction === 'ascending') {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] < b[key] ? 1 : -1;
          }
        });
        setData(sortedData);
      };

    useEffect(() => {
        Axios.post("http://localhost:8000/getGlobalLeaderboard", {}).then((response) => {
            setData(response.data.result);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Grid container spacing={2} padding={5} direction={'column'} justifyContent="center" alignItems="center">
            <Grid item container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => requestSort('rank')}>Sort by Rank</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => requestSort('total_games_played')}>Sort by Games Played</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => requestSort('games_won')}>Sort by Games Won</Button>
                </Grid>
                <Grid item>
            </Grid>
            <Grid container direction="column" padding={2} spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <TableContainer componenet={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Rank</TableCell>
                                    <TableCell align='center'>Username</TableCell>
                                    <TableCell align='center'>Games Played</TableCell>
                                    <TableCell align='center'>Games Won</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {Array.isArray(data) && data.map((player, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center'>{player.rank}</TableCell>
                                    <TableCell align='center'>{player.username}</TableCell>
                                    <TableCell align='center'>{player.total_games_played}</TableCell>
                                    <TableCell align='center'>{player.games_won}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item
                container
                direction="row"
                padding={2}
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
                >
                    <Grid item>
                        <Button variant="contained" onClick={() => navigate("/heario-client")}>Back</Button>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
        )
    }
