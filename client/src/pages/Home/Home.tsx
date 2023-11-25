import React from 'react';
import { HeroImageLeft } from '../../components/HeroImageLeft/HeroImageLeft';
import classes from './Home.module.css';

export const Home = (): React.ReactElement => {
    return (
        <div className={classes.wrapper}>
            <h1>Thomas Batterman Mental Health Project</h1>
            <HeroImageLeft />
        </div>
    );
}