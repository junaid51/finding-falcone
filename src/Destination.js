import React from 'react';
import { FormControl, InputLabel,
    Select, FormHelperText , MenuItem, Input } from '@material-ui/core';

const Destination = ({ planets, value, label, handlePlanetChange }) => {
    return (
        <form autoComplete="off">
        <FormControl>
            <InputLabel htmlFor={label}>Destination {label[label.length - 1]}</InputLabel>
            <Select
            value={value}
            onChange={handlePlanetChange}
            input={<Input name={label} id={label} />}>
            {planets.map((planet, i) => <MenuItem key={i} value={planet}>{planet.name}</MenuItem>)}
            </Select>
            <FormHelperText>Please choose a planet</FormHelperText>
        </FormControl>
        </form>
    );
};

export default Destination;