import axios from "axios";
import { BASE_URL, CORE_CURRENCIES } from ".";

const instance = axios.create({ baseURL: BASE_URL });

const leaveCoreCurrencies = (rate) => CORE_CURRENCIES.includes(rate.code);

export const fetchLatestData = (days = 2) =>
  instance.get(`/tables/a/last/${days}?format=json`);

export const fetchDataRange = (from, to) =>
  instance.get(`/tables/a/${from}/${to}?format=json`);

export const fetchCurrencyFromData = (currency, date = "today") =>
  instance.get(`/rates/a/${currency}/${date}/`);

export const getHeaderCurrencies = async (days = 2) => {
  const { data } = await fetchLatestData(days);
  const [yesterday, today] = data;
  const res = today.rates.filter(leaveCoreCurrencies).map((rate) => ({
    ...rate,
    effectiveDate: today.effectiveDate,
    today: rate.mid,
    yesterday: yesterday.rates.find((r) => r.code === rate.code).mid,
  }));

  return res;
};
