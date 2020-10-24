import React, { Component } from 'react';
// import Modal from '@material-ui/core/Modal';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
// import Loader from './Loader';
import { DotLoader } from 'react-spinners';
import covid from './CovidLogo.svg';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class App extends Component {
  state = {
    cardData: [],
    isLoading: true,
    countrySelected: 'Globe',
    date: [],
    alert: true,
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    // console.log(fetchedData[0]);
    this.setState({
      cardData: fetchedData[0],
      isLoading: false,
      date: fetchedData[0].last_update,
    });
  }

  handleCountry = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({
      date: fetchedData[0].last_update,
      cardData: fetchedData[0],
      countrySelected: country,
    });
  };

  handleDate = async (date) => {
    const fetchedData = await fetchData(this.state.countrySelected);
    let dateData = fetchedData.filter((e) => e.last_update === date);
    this.setState({
      cardData: dateData[0],
      date,
    });
  };

  render() {
    if (this.state.isLoading || !this.state.cardData) {
      return (
        <div className={styles.App}>
          <DotLoader loading />
          <br />
          Fetching Data
        </div>
      );
    }
    const { cardData, countrySelected: country, date } = this.state;
    return (
      <div>
        <div className={styles.container}>
          {this.state.alert ? (
            <SweetAlert
              // btnSize='lg'
              // confirmBtnText='  OK!  '
              style={{
                background: '#212121',
                fontSize: '15px',
                margin: '10%',
                fontWeight: '100 !important',
              }}
              type='info'
              confirmBtnStyle={{
                textDecoration: 'none',
                padding: '15px 30px',
                fontSize: '15px',
                color: 'white',
                borderRadius: '.5rem',
                border: '2px solid #ffffff',
                outline: 'none',
                boxShadow: 'none',
              }}
              title='Try Clicking on Infected, Deaths, Recovered button on Graph'
              onConfirm={() => {
                this.setState({ alert: false });
              }}
            >
              <h3
                style={{
                  display: window.innerwidth < 770 ? 'block' : 'none',
                }}
              >
                &lt;-- Slide Graph to LEFT! &lt;--
              </h3>
            </SweetAlert>
          ) : null}
          <img src={covid} className={styles.image} alt='covid' />

          <Cards data={cardData} country={country} date={date} />

          <CountryPicker
            handleCountry={this.handleCountry}
            handleDate={this.handleDate}
            country={country}
            dateSelected={date}
          />
        </div>

        <div className={styles.graphContainer}>
          <Chart date={date} data={cardData} country={country} />
        </div>
      </div>
    );
  }
}
