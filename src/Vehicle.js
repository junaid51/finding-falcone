import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const Vehicle = ({ vehicles, value, distance, label, handleVehicleChange }) => {
    return (
        <form autoComplete="off">
        <FormControl component="fieldset">
            <FormLabel component="legend">Vehicles</FormLabel>
            <RadioGroup
            name={label}
            value={value}
            onChange={handleVehicleChange}
            >
            {
                vehicles.map((vehicle, i) => {
                    return (
                        <FormControlLabel
                            key={i}
                            value={vehicle.name}
                            control={<Radio />}
                            label={`${vehicle.name} (${vehicle.total_no})`}
                            disabled={vehicle.total_no === 0 || vehicle.max_distance < distance ? true : false}
                        />
                    )
                })
            }
            </RadioGroup>
        </FormControl>
        </form>
    );
};

export default Vehicle;