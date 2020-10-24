import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({
  country,
  data: { total_cases, total_deaths, total_recovered },
  date,
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchData(country));
    };
    fetchAPI();
  }, [setDailyData, country]);

  if (dailyData[0]) {
    var deathPer = Math.round(
        (dailyData[0].total_deaths / dailyData[0].total_cases) * 100
      ),
      dailyDataUpdated = dailyData.filter((e) => {
        return e.last_update.match(`01T`); //|| e.last_update.match(todaysDate);
      }),
      lastUpdate = dailyData[0].last_update;

    // console.log(dailyData[0].last_update === date);

    dailyDataUpdated.unshift(dailyData[0]);
    dailyDataUpdated.push(dailyData[dailyData.length - 1]);
  }

  // console.log(
  //   dailyData.filter((e) => {
  //     return console.log(e);
  //   })
  // );

  const lineChart = dailyData.length ? (
    <Line
      options={{
        barDatasetSpacing: 1,
        barValueSpacing: 1,
        scales: {
          yAxes: [
            {
              gridLines: {
                color: '#aaaaaa',
              },
              ticks: {
                fontColor: 'white',
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: '#aaaaaa',
              },
              ticks: {
                fontColor: 'white',
              },
            },
          ],
        },
      }}
      data={{
        labels: dailyDataUpdated.map(({ last_update }) =>
          new Date(last_update).toDateString()
        ),

        datasets: [
          {
            data: dailyDataUpdated.map(({ total_deaths }) => total_deaths),
            label: 'Deaths',
            borderColor: 'darkred',
            backgroundColor: 'rgb(255, 0, 0)',
            fill: true,
          },
          {
            data: dailyDataUpdated.map(
              ({ total_recovered }) => total_recovered
            ),
            label: 'Recovered',
            borderColor: 'darkgreen',
            backgroundColor: ' rgb(0, 255, 0)',

            fill: true,
          },

          {
            data: dailyDataUpdated.map(({ total_cases }) => total_cases),
            label: 'Infected',
            borderColor: '#2222b4',

            backgroundColor: '#3333ff',
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  // console.log(data);
  const barChart = lastUpdate ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgb(0, 0, 255)',
              'rgb(0, 255, 0)',
              'rgb(255, 0, 0)',
            ],
            data: [total_cases, total_recovered, total_deaths],
            barPercentage: 0.4,
          },
        ],
      }}
      options={{
        barDatasetSpacing: 1,
        barValueSpacing: 1,
        scales: {
          yAxes: [
            {
              gridLines: {
                color: '#aaaaaa',
              },
              ticks: {
                beginAtZero: true,
                fontColor: 'white',
              },
            },
          ],

          xAxes: [
            {
              gridLines: {
                color: '#aaaaaa',
              },
              ticks: {
                padding: 10,
                fontColor: 'white',
              },
            },
          ],
        },

        legend: { display: false },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <div className={styles.chartAreaWrapper}>
          <h3>
            {` Covid-19 Condition in ${country} on ${new Date(
              date
            ).toDateString()}.`}
          </h3>
          {lastUpdate === date ? lineChart : barChart}{' '}
        </div>
      </div>

      <div className={styles.card}>
        <h4>
          For every <span className={styles.blue}>100</span> people in the
          community who had gotten infected, approximately
          <span className={styles.red}> {deathPer} </span> ended up dying.
        </h4>
        <h3>
          Made With <span>❤</span> by
          <u>
            <i>
              <a href='https://github.com/01kingmaker01/Covid-Tracker'>
                {' '}
                Ketan Chavan
              </a>
            </i>
          </u>
        </h3>
      </div>
    </div>
  );
};

export default Chart;
