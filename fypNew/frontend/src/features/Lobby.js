import React , { useEffect }  from "react";
import { socket } from "../api/socket";
import Settings from "./Settings";
import { useSelector, useDispatch } from "react-redux";

import { allPlayers, setIsStarted, setIsGameOver } from "../features/gameSlice";

import Game from "./Game";
import Chat from "./Chat";

import { Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";


export default function Lobby(){
    const id = useSelector(state => state.game.id);
    const dispatch = useDispatch();
    const players = useSelector(state => state.game.players);
    const isStarted = useSelector(state => state.game.isStarted);
    const roundCount = useSelector(state => state.game.roundCount);
    const status = useSelector(state => state.game.status);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          const message = "Are you sure you want to leave? You will be redirected to the home page.";
          event.returnValue = message; // Standard for most browsers
          return message; // For some older browsers
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);


    useEffect(() => {
        socket.on("allPlayers", (players) => {
            dispatch(allPlayers(players));
        });
        return () => {
            socket.off("allPlayers");
        };
    }, [dispatch]);

    useEffect(() => {
        socket.on("gameStarted", () => {
            dispatch(setIsStarted(true));
            console.log("gameStarted");
        });
        return () => {
            socket.off("gameStarted");
        };
    });
    
    useEffect(() => {
        socket.on("gameReset", () => {
            dispatch(setIsStarted(false));
            dispatch(setIsGameOver(false));
            console.log("gameReset")
        });
        return () => {
            socket.off("gameReset");
        };
    });

    useEffect(() => {
        socket.on("scores", (scores) => {
            dispatch(allPlayers);
            console.log("scores");
            });
        return () => {
            socket.off("scores");
        };
    });

    useEffect(() => {
        socket.on('hostLeft', () => {
            // Show alert
            alert('The host has left the lobby. Redirecting to the home page.');
            // Redirect to the home page (adjust the route accordingly)
        });    
        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('hostLeft');
        };
    }, [socket]);

        
    return (
        <div>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                padding={2}
                bgcolor="primary.main"
            >
                <Grid item>
                    <Typography variant="h4">
                        Lobby ID: {id}
                    </Typography>
                </Grid>
                    <Grid item>
                        <Typography variant="h5">
                        {status}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">
                        Round Count: {roundCount}
                        </Typography>
                    </Grid>
            </Grid>
            <div>
                <Grid
                    container
                    justifyContent="space-around"
                    alignItems={"flex-start"}
                    padding={2}
                >
                    <Grid item xs={3} padding={2}>                
                        <Stack spacing={2}>
                            {Object.values(players).map((player) => (
                            <Paper key={player.id} elevation={3} >
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={1}
                                    padding={2}
                                >
                                    <div>Name: {player.name}</div>
                                    <div>Score: {player.score}</div>
                                </Stack>
                            </Paper>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid item xs={6} padding={2}>
                        <Grid item bgcolor={"primary.main"} borderRadius="12px" padding={2}>
                            {!isStarted && (
                                <Settings />
                            )}
                            {isStarted && (
                                <Game />
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={3} padding={2}>
                        <Grid item>
                            <Chat />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}