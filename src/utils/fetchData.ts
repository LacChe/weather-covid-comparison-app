import { Preferences } from '@capacitor/preferences';

const states: {
  [key: string]: string;
} = {
  Alabama: 'AL',
  Alaska: 'AK',
  'American Samoa': 'AS',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District Of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Guam: 'GU',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  'Marshall Islands': 'MH',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'NP',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  'US Virgin Islands': 'VI',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

let cases: { date: string; state: string; cases: number }[] = [];
let temperatures: { date: string; state: string; value: number }[] = [];
const TEMPERATURE_KEY = 'TEMPERATURES';

export async function fetchCases(date: string) {
  if (cases.length === 0) {
    await fetch('https://disease.sh/v3/covid-19/nyt/states?lastdays=all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        cases = data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // only get cases for required date and within abbreviation list
  const filteredCases = cases.filter(
    (c) => c.date === date && Object.keys(states).includes(c.state),
  );
  let formattedCases: { value: number; state: string; date: string }[] = [];

  // calculate new cases and state abbreviations
  filteredCases.forEach((c) => {
    let newCase = { date: c.date, value: c.cases, state: states[c.state] };
    // calculate new cases if there are dates before to check
    let checkDate = new Date(newCase.date);
    if (checkDate.toISOString().substring(0, 10) !== cases[0]?.date) {
      checkDate.setDate(checkDate.getDate() - 1); // day before
      const checkCases = cases.filter(
        (checkCase) =>
          checkCase.date === checkDate.toISOString().substring(0, 10) &&
          checkCase.state === c.state,
      );
      if (checkCases.length !== 0) {
        newCase.value = newCase.value - checkCases[0].cases;
      }
    }

    formattedCases.push(newCase);
  });

  return formattedCases;
}

export async function fetchTemperature(date: string, setIsOpen: any) {
  temperatures = JSON.parse(
    (await Preferences.get({ key: TEMPERATURE_KEY })).value || '[]',
  );
  if (temperatures.filter((t) => t.date === date).length === 0) {
    Object.keys(states).forEach(async (state) => {
      await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${state}/${date}/${date}?unitGroup=us&key=${
          import.meta.env.VITE_WEATHER_KEY
        }`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      )
        .then((response) => {
          if (response.status === 429) {
            setIsOpen(true);
          }
          return response.json();
        })
        .then((data) => {
          temperatures.push({
            value: data?.days[0].temp,
            state: states[state],
            date: date,
          });
          Preferences.set({
            key: TEMPERATURE_KEY,
            value: JSON.stringify(temperatures),
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  return temperatures.filter((t) => t.date === date);
}
