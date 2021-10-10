<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="d-flex justify-center my-5">
        <the-currency
          v-for="currency in latestData"
          :key="currency.code"
          :currency="currency"
        />
      </div>
      <div class="grid">
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
          <div>From</div>
          <div>To</div>
        </div>
        <rate-chart
          v-if="selectedCurrencies"
          :labels="labels"
          :datasets="selectedCurrencies"
        />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import {
  CORE_CURRENCIES,
  COLORS,
  getHeaderCurrencies,
  fetchLatestData,
} from "@/shared";
import TheCurrency from "./components/TheCurrency.vue";
import RateChart from "./components/RateChart.vue";
import CurrencySelect from "./components/CurrencySelect.vue";

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
    const data = await getHeaderCurrencies();
    const { data: apiData } = await fetchLatestData(30);
    const { labels, datasets } = this.parseChartData(apiData);
    this.labels = labels;
    this.datasets = datasets;
    this.latestData = data;
  },
  methods: {
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
  },

  data() {
    return {
      latestData: [],
      labels: [],
      datasets: [],
      currencies: CORE_CURRENCIES,
      availableCurrencies: CORE_CURRENCIES,
    };
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
}
</style>
