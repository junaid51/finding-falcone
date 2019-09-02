import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const Vehicle = ({ vehicles, value, label, handleVehicleChange }) => {
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
                vehicles.map((data, i) => {
                    return (
                        <FormControlLabel
                            key={i}
                            value={data.name}
                            control={<Radio />}
                            label={`${data.name} (${data.total_no})`}
                            disabled={data.total_no === 0 ? true : false}
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