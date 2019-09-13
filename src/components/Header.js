import React from 'react';
import { Grid } from '@material-ui/core';
import styles from '../styles';

const Header = () => {
        return (
            <Grid style={styles.center} item xs={12}>
                <h1>Finding Falcone</h1>
            </Grid>
        );
};

export default Header;