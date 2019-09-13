import React from 'react';
import { Grid } from '@material-ui/core';
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const Vehicle = ({ vehicles, value, distance, label, handleVehicleChange }) => {
    return (
        <Grid style={{padding: 6}}>
        <FormControl component="fieldset">
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
        </Grid>
    );
};

export default Vehicle;