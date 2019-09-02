import React from 'react';
import falcone from './api/falcone';
import { Button, Grid } from '@material-ui/core';
import Destination from './Destination';
import Vehicle from './Vehicle';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            planets: [],
            vehicles: [],
            vehiclesOriginal: [],
            selectedDestinations: {
                destination1: "",
                destination2: "",
                destination3: "",
                destination4: "",
            },
            selectedVehicles: {
                vehicle1: "",
                vehicle2: "",
                vehicle3: "",
                vehicle4: "",
            },
            errorMessage: ""
        };

        this.getFalconeData();
    };

    getFalconeData = async() => {
        try {
            const planets = await falcone.get('planets');
            const vehicles = await falcone.get('vehicles');
            console.log(planets.data);
            console.log(vehicles.data);
            this.setState({
                planets: planets.data,
                vehicles: vehicles.data,
                vehiclesOriginal: vehicles.data
            });
        } catch (err) {
            console.log(err);
        }
    };

    handlePlanetChange = (event) => {
        const { name, value } = event.target;
        console.log(value);

        for (let objVal of Object.values(this.state.selectedDestinations)) {
            if(value.name === objVal.name) {
                this.setState({errorMessage: 'Cannot enter same planet'});
                return;
            }
        }

        this.setState(prev => ({
            ...prev,
            errorMessage: '',
            selectedDestinations: {
                ...prev.selectedDestinations,
                [name]: value
            }
        }));
        console.log(this.state);
    }

    handleVehicleChange = async (event) => {
        const { name, value } = event.target;
        const newVehicles = JSON.parse(JSON.stringify(this.state.vehiclesOriginal));
        await this.setState(prev => ({
            selectedVehicles: {
                ...prev.selectedVehicles,
                [name]: value
            }}));
        
        newVehicles.map(v => {
            for (let objVal of Object.values(this.state.selectedVehicles)) {
                if (objVal === v.name) {
                    v.total_no -= 1;
                }
            }
        });

        this.setState(prev => ({
                ...prev,
                errorMessage: '',
                vehicles: newVehicles
            }));
    };

    render() {

        const { planets, vehicles, errorMessage } = this.state;
        const { destination1, destination2, destination3, destination4 } = this.state.selectedDestinations;
        const { vehicle1, vehicle2, vehicle3, vehicle4 } = this.state.selectedVehicles;
                

        return (
            <Grid container spacing={4}>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>Finding Falcone</h1>
                </Grid>
                <Grid item xs={3}>
                    <Destination
                        planets={planets}
                        value={destination1}
                        label="destination1"
                        handlePlanetChange={this.handlePlanetChange}
                    />
                {destination1 ?
                <Vehicle
                    vehicles={vehicles}
                    value={vehicle1}
                    label="vehicle1"
                    handleVehicleChange={this.handleVehicleChange}
                /> : null}
                </Grid>
                <Grid item xs={3}>
                    <Destination
                        planets={planets}
                        label="destination2"
                        value={destination2}
                        handlePlanetChange={this.handlePlanetChange}
                    />
                {destination2 ?
                <Vehicle
                    vehicles={vehicles}
                    value={vehicle2}
                    label="vehicle2"
                    handleVehicleChange={this.handleVehicleChange}
                /> : null}
                </Grid>
                <Grid item xs={3}>
                    <Destination
                        planets={planets}
                        label="destination3"
                        value={destination3}
                        handlePlanetChange={this.handlePlanetChange}
                    />
                {destination3 ?
                <Vehicle
                    vehicles={vehicles}
                    value={vehicle3}
                    label="vehicle3"
                    handleVehicleChange={this.handleVehicleChange}
                /> : null}
                </Grid>
                <Grid item xs={3}>
                    <Destination
                        planets={planets}
                        label="destination4"
                        value={destination4}
                        handlePlanetChange={this.handlePlanetChange}
                    />
                {destination4 ?
                <Vehicle
                    vehicles={vehicles}
                    value={vehicle4}
                    label="vehicle4"
                    handleVehicleChange={this.handleVehicleChange}
                /> : null}
                </Grid>
                {
                    errorMessage ?
                    <Grid style={{display: 'flex', justifyContent: 'center', fontSize: 16, color: 'red'}} item xs={12}>{errorMessage}</Grid> : null
                }
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" color="primary">
                    Find Falcone
                </Button>
                </Grid>
            </Grid>
        )
    };
};

export default App;