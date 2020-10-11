import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

const Cards = ({
  date,
  data: { last_update, total_cases, total_deaths, total_recovered },
}) => {
  return (
    <div className={styles.container}>
      <Grid container spacing={4} justify='center'>
        <Grid
          elevation={5}
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography className={styles.blue} gutterBottom>
              Infected
            </Typography>
            <Typography variant='h5'>
              <CountUp
                start={0}
                end={total_cases}
                duration={2.5}
                separator=','
              />
            </Typography>
            <Typography color='textSecondary'>
              {new Date(last_update).toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of Active Cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          elevation={5}
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography className={styles.green} gutterBottom>
              Recovered
            </Typography>
            <Typography variant='h5'>
              <CountUp
                start={0}
                end={total_recovered}
                duration={2.5}
                separator=','
              />
            </Typography>
            <Typography color='textSecondary'>
              {new Date(last_update).toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of Recoveries from COVID-19
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          elevation={5}
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography className={styles.red} gutterBottom>
              Deaths
            </Typography>
            <Typography variant='h5'>
              <CountUp
                start={0}
                end={total_deaths}
                duration={2.5}
                separator=','
              />
            </Typography>
            <Typography color='textSecondary'>
              {new Date(last_update).toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of Deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
