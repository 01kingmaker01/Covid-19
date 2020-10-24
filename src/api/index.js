import axios from 'axios';

// const url = 'https://covid19-api.org/api/status#';
const url = 'https://covid19-api.org/api';

export const fetchData = async (country) => {
  try {
    if (country && country !== 'Globe') {
      const { data } = await axios.get(`${url}/timeline/${country}`);
      const modifiedData = data.map(
        ({ last_update, cases, deaths, recovered }) => ({
          total_cases: cases,
          total_deaths: deaths,
          total_recovered: recovered,
          last_update,
        })
      );
      // console.log(modifiedData);
      return modifiedData;
    } else {
      const { data } = await axios.get(`${url}/timeline/`);
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const countriesName = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data.map(({ name, alpha2 }) => ({ name, alpha2 }));
    // return{name,alpha2}
  } catch (error) {
    console.error(error);
  }
};
