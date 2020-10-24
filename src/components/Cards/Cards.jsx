import React from 'react';
import { Paper, Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
// import classes from './Cards.module.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyle = makeStyles((theme) => ({
  root: {
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  },
}));

const Cards = ({
  date,
  data: { last_update, total_cases, total_deaths, total_recovered },
}) => {
  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={4} justify='center'>
          <Grid
            elevation={10}
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected, useStyle().root)}
          >
            <Paper elevation={0}>
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
            </Paper>
          </Grid>
          <Grid
            elevation={5}
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <Paper elevation={0}>
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
            </Paper>
          </Grid>
          <Grid
            elevation={5}
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.deaths)}
          >
            <Paper elevation={0}>
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
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Cards;
