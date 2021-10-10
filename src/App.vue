<template>
  <v-app>
    <app-bar />

    <v-main>
      <section class="d-flex justify-center my-5">
        <the-currency
          v-for="currency in latestData"
          :key="currency.code"
          :currency="currency"
        />
      </section>
      <section class="grid">
        <div class="controls pa-5">
          <h2 class="mb-4">Select your currencies</h2>
          <div class="currencies d-flex">
            <currency-select
              v-for="currency in latestData"
              :key="currency.code"
              :currency="currency"
              :isSelected="currencies.includes(currency.code)"
              @toggleCurrency="handleToggleCurrency"
            >
            </currency-select>
          </div>
          <h2 class="my-4">Select your dates</h2>
          <div>
            <date-selector v-model="from" label="From" />
            <date-selector v-model="to" label="To" />
          </div>
        </div>
        <rate-chart
          v-if="selectedCurrencies"
          :labels="labels"
          :datasets="selectedCurrencies"
        />
      </section>
      <error-modal v-model="dialog" />
      <welcome-screen v-model="welcome" />
    </v-main>
  </v-app>
</template>

<script>
import {
  CORE_CURRENCIES,
  COLORS,
  DEFAULT_DATE,
  getHeaderCurrencies,
  fetchLatestData,
  fetchDataRange,
} from "@/shared";
import TheCurrency from "./components/TheCurrency.vue";
import RateChart from "./components/RateChart.vue";
import CurrencySelect from "./components/CurrencySelect.vue";
import DateSelector from "./components/DateSelector.vue";
import ErrorModal from "./components/ErrorModal.vue";
import AppBar from "./components/AppBar.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";

export default {
  name: "App",
  computed: {
    selectedCurrencies() {
      return this.datasets.filter((item) =>
        this.currencies.includes(item.label)
      );
    },
  },
  async created() {
    try {
      const data = await getHeaderCurrencies();
      const { data: apiData } = await fetchLatestData(30);
      const { labels, datasets } = this.parseChartData(apiData);
      this.labels = labels;
      this.datasets = datasets;
      this.latestData = data;
    } catch (err) {
      this.handleError(err);
    }
  },
  methods: {
    handleError(err) {
      this.dialog = {
        show: true,
        message:
          err.response.statusText ||
          err.response.data ||
          err.message ||
          err.msg ||
          err,
      };
    },
    handleToggleCurrency(currency) {
      if (this.currencies.includes(currency)) {
        this.currencies = this.currencies.filter((code) => code !== currency);
      } else {
        this.currencies = [...this.currencies, currency];
      }
    },
    parseChartData(apiData) {
      const labels = apiData.map((day) => day.effectiveDate);
      const temp = apiData
        .map((day) => ({
          rates: day.rates.map((rate) => ({
            ...rate,
            label: day.effectiveDate,
          })),
        }))
        .flatMap((day) => [...day.rates]);
      const datasets = [];
      temp.forEach((item) => {
        let candidate = datasets.find((i) => i.label === item.code);
        if (candidate) {
          candidate.data = [
            ...candidate.data,
            {
              x: item.label,
              y: item.mid,
            },
          ];
        } else {
          datasets.push({
            label: item.code,
            borderColor: COLORS[datasets.length],
            data: [
              {
                x: item.label,
                y: item.mid,
              },
            ],
          });
        }
      });
      return {
        labels,
        datasets,
      };
    },
  },
  components: {
    TheCurrency,
    RateChart,
    CurrencySelect,
    DateSelector,
    ErrorModal,
    AppBar,
    WelcomeScreen,
  },

  data() {
    return {
      welcome: true,
      dialog: {
        show: false,
        message: "",
      },
      from: DEFAULT_DATE,
      to: DEFAULT_DATE,
      toMenu: false,
      latestData: [],
      labels: [],
      datasets: [],
      currencies: CORE_CURRENCIES,
      availableCurrencies: CORE_CURRENCIES,
    };
  },
  watch: {
    from: async function (value) {
      try {
        const { data: apiData } = await fetchDataRange(value, this.to);
        const { labels, datasets } = this.parseChartData(apiData);
        this.labels = labels;
        this.datasets = datasets;
      } catch (err) {
        this.handleError(err);
      }
    },
    to: async function (value) {
      try {
        const { data: apiData } = await fetchDataRange(this.from, value);
        const { labels, datasets } = this.parseChartData(apiData);
        this.labels = labels;
        this.datasets = datasets;
      } catch (err) {
        this.handleError(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.grid {
  @media screen and (min-width: 960px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 20px;
  }
}
</style>
