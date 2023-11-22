import countries from './countries.json';
export const countriesCodesTwo = countries.map((country) =>
  country.alpha2.toUpperCase(),
);
export const countriesCodesSet = new Set(countriesCodesTwo);
