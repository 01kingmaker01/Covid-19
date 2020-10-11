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

export const fetchDate = async (date) => {
  try {
    if (date && date !== '') {
      let modifiedDate = (dateIN) => {
        let month = new Date(dateIN).getMonth(),
          year = new Date(dateIN).getFullYear(),
          digit = new Date(dateIN).getDate();

        month = (month < 9 ? '0' : '') + (month + 1);
        digit = (digit < 10 ? '0' : '') + digit;

        return `${year}-${month}-${digit}`;
      };

      let updatedDate = modifiedDate(date);

      const { data } = await axios.get(`${url}/timeline/${updatedDate}`);
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

// let toUpper = (str) => {
//   return str

//     .split(' ')
//     .map((word) => {
//       if (word[0] !== undefined) {
//         return word[0].toUpperCase() + word.substr(1);
//       }
//     })
//     .join(' ');
// };
