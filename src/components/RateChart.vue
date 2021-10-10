<template>
  <div class="pa-5">
    <h2>Average rate</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { DEFAULT_CHART } from "@/shared";

export default {
  name: "RateChart",
  props: {
    datasets: Array,
    labels: Array,
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    chartData() {
      return {
        datasets: this.datasets,
        labels: this.labels,
      };
    },
  },
  methods: {
    renderChart({ datasets, labels }) {
      const config = {
        ...DEFAULT_CHART,
        data: {
          labels,
          datasets,
        },
      };
      this.chart = new Chart(this.$refs.chart, config);
    },
  },
  watch: {
    chartData: function (values) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.renderChart(values);
    },
  },
};
</script>

<style lang="scss" scoped></style>
