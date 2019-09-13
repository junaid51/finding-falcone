import React from 'react';
import styles from '../styles';
import { Button, Grid } from '@material-ui/core';
import Destination from './Destination'

const MainContent = ({state, handlePlanetChange, handleVehicleChange, onSubmit}) => {

    const renderItems = [1,2,3,4];

        return (
            <Grid container spacing={4}>
                {
                renderItems.map(v => (
                    <Grid key={v} item xs={3}>
                    <Destination
                        state={state}
                        handlePlanetChange={handlePlanetChange}
                        handleVehicleChange={handleVehicleChange}
                        index={v}
                    />
                    </Grid>
                ))
                }
                {
                    state.errorMessage &&
                    <Grid style={styles.errorMessage} item xs={12}>{state.errorMessage}</Grid>
                }
                 <Grid item xs={12} style={styles.center}>
                     Time Taken: {state.timeTaken}
                 </Grid>
                <Grid item xs={12} style={styles.center}>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    Find Falcone
                </Button>
                </Grid>
            </Grid>
        );
};

export default MainContent;