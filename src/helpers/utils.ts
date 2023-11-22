import { countriesCodesSet } from '../constants/contries';

export function rountToDoubles(num: number) {
  return num.toFixed(2);
}

export function validateStockId(stockId: string) {
  const isLen = stockId.length === 12;
  const isNSI = /^[0-9A-Z]+$/.test(stockId);
  const isCountryCode = countriesCodesSet.has(stockId.slice(0, 2));
  const isLastANum = /^[0-9]+$/.test(stockId[stockId.length - 1]);
  return isNSI && isCountryCode && isLen && isLastANum;
}
