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
      data={{
        labels: dailyDataUpdated.map(({ last_update }) =>
          new Date(last_update).toDateString()
        ),
        datasets: [
          {
            data: dailyDataUpdated.map(
              ({ total_recovered }) => total_recovered
            ),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: ' rgba(0, 255, 0, 0.3)',

            fill: true,
          },
          {
            data: dailyDataUpdated.map(({ total_deaths }) => total_deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: ' rgb(255, 0, 0)',
            fill: true,
          },
          {
            data: dailyDataUpdated.map(({ total_cases }) => total_cases),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: false,
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
              'rgba(0, 0, 255, 0.5)',
              'rgba(0,255, 0,  0.5)',
              'rgba(255,0, 0, 0.5)',
            ],
            data: [total_cases, total_recovered, total_deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: false,
          // text: ` Covid-19 Condition in ${country} on ${new Date(
          // date
          // ).toDateString()}.`,
        },
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
