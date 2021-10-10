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
      <div class="d-flex justify-center">
        <the-currency
          v-for="currency in latestData"
          :key="currency.code"
          :currency="currency"
        />
      </div>
      <rate-chart v-if="chartData" :labels="labels" :datasets="chartData" />
    </v-main>
  </v-app>
</template>

<script>
import { getHeaderCurrencies, fetchLatestData } from "@/shared";
import TheCurrency from "./components/TheCurrency.vue";
import RateChart from "./components/RateChart.vue";

export default {
  name: "App",
  async created() {
    const data = await getHeaderCurrencies();
    const { data: chartData } = await fetchLatestData(30);
    this.labels = chartData.map((day) => day.effectiveDate);
    const dataSets = chartData
      .map((day) => ({
        rates: day.rates.map((rate) => ({ ...rate, label: day.effectiveDate })),
      }))
      .flatMap((day) => [...day.rates])
      .filter((item) => item.code === "USD" || item.code === "EUR");
    const res = [];
    dataSets.forEach((item) => {
      let candidate = res.find((i) => i.label === item.code);
      if (candidate) {
        candidate.data = [
          ...candidate.data,
          {
            x: item.label,
            y: item.mid,
          },
        ];
      } else {
        res.push({
          label: item.code,
          data: [
            {
              x: item.label,
              y: item.mid,
            },
          ],
        });
      }
    });
    this.chartData = res;
    this.latestData = data;
  },

  components: {
    TheCurrency,
    RateChart,
  },

  data() {
    return {
      latestData: [],
      labels: [],
      chartData: [],
    };
  },
};
</script>
