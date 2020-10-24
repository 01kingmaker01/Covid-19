import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';

// import { withStyles } from '@material-ui/core/styles';
import { countriesName, fetchData } from '../../api';

const CountryPicker = ({
  handleCountry,
  handleDate,
  country,
  dateSelected,
}) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchCountries = async () => {
      setFetchedCountries(await countriesName());
    };

    const fetchedData = async () => {
      setDate(await fetchData(country));
    };

    fetchCountries();
    fetchedData();
  }, [country]);

  // console.log(date.map(({ last_update }) => ({ date: last_update })));
  if (!date) {
    return 'Loading...';
  }
  let modifiedDate = (dateIN) => {
    const dateArr = dateIN.split(' ');
    return `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`;
  };

  const countries = fetchedCountries.map((country, i) => (
      <option className={styles.option} key={i} value={country.alpha2}>
        {country.name}
      </option>
    )),
    dates = date.map(({ last_update }, i) => (
      <option className={styles.option} key={i} value={last_update}>
        {modifiedDate(new Date(last_update).toDateString())}
      </option>
    ));
  // const MyFormControl = withStyles({
  //   root: {
  //     // background:'linear-gradient(45deg, #ff4747 30%, #FF8E53 90%)',
  //     borderRadius: 10,
  //     border: 'none',
  //     color: 'white',
  //     height: 48,
  //     // padding: '0 30px',
  //     boxShadow: '0 3px 5px 2px white',
  //   },
  //   // icon: {
  //   //   color: 'white',
  //   // },
  // })(FormControl);
  // const MySelect = withStyles({
  //   root: {
  //     borderBottom: 'none',
  //     // background: 'linear-gradient(45deg, #ff4747 30%, #FF8E53 90%)',
  //     // borderRadius: 10,
  //     // border: 'none',
  //     color: 'white',
  //     // height: 48,
  //     // padding: '0 30px',
  //     // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   },
  //   icon: {
  //     color: 'white',
  //   },
  // })(Select);

  return (
    <div>
      <FormControl variant='outlined' className={styles.formControl}>
        <NativeSelect
          className={styles.select}
          value={country}
          onChange={(e) => handleCountry(e.target.value)}
        >
          <option value='Globe' className={styles.option}>
            Globe
          </option>
          {countries}
        </NativeSelect>
      </FormControl>
      <FormControl variant='outlined' className={styles.formControl}>
        <NativeSelect
          className={styles.select}
          value={dateSelected}
          onChange={(e) => handleDate(e.target.value)}
        >
          {/* <option value={date[0].last_update} className={styles.option}>
            Total Till Date
          </option> */}

          {dates}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
