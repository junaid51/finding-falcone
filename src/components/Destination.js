import React from 'react';
import { FormControl, InputLabel,
    Select, FormHelperText , MenuItem, Input } from '@material-ui/core';
import Vehicle from './Vehicle';

const Destination = ({ state, index, handlePlanetChange, handleVehicleChange }) => {

    const { planets, vehicles } = state;
    const destLabel = `destination${index}`;
    const destination = state.selectedDestinations[destLabel];
    const vehicleLabel = `vehicle${index}`;
    const vehicle = state.selectedVehicles[vehicleLabel];

    return (
        <>
        <FormControl>
            <InputLabel htmlFor={destLabel}>Destination {index}</InputLabel>
            <Select
            value={destination}
            onChange={handlePlanetChange}
            input={<Input name={destLabel} id={destLabel} />}>
            {planets.map((planet, i) => <MenuItem key={i} value={planet}>{planet.name}</MenuItem>)}
            </Select>
            <FormHelperText>Please choose a planet</FormHelperText>
        </FormControl>
        {
            destination &&
                <Vehicle
                    vehicles={vehicles}
                    value={vehicle}
                    distance={destination.distance}
                    label={vehicleLabel}
                    handleVehicleChange={handleVehicleChange}
                />
        }
        </>
    );
};

export default Destination;