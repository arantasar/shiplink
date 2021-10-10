<template>
  <div
    class="currency pa-4 ma-2"
    :class="{ positive: difference > 0, negative: difference < 0 }"
  >
    <img class="flag" :src="flag" />
    <div class="d-flex">
      <div class="content d-flex flex-column">
        <div class="name font-weight-bold">{{ currency.code }}</div>
        <div class="today">{{ currency.today }}</div>
        <div class="difference grey--text">{{ difference }}</div>
      </div>
      <the-arrow :difference="difference" />
    </div>
  </div>
</template>

<script>
import gbp from "@/assets/flags/uk.png";
import eur from "@/assets/flags/eur.webp";
import usd from "@/assets/flags/usd.png";
import TheArrow from "./TheArrow.vue";

export default {
  name: "TheCurrency",
  components: { TheArrow },
  props: {
    currency: Object,
  },
  computed: {
    difference() {
      return (this.currency.today - this.currency.yesterday).toFixed(4);
    },
    flag() {
      let ans = "";
      switch (this.currency.code) {
        case "EUR":
          ans = eur;
          break;
        case "GBP":
          ans = gbp;
          break;
        case "USD":
          ans = usd;
          break;
      }
      return ans;
    },
  },
};
</script>

<style lang="scss" scoped>
.currency {
  border: 1px solid lightgrey;
  border-radius: 25px;
}

.flag {
  width: 100px;
  height: 60px;
  object-fit: contain;
}

.difference {
  font-size: 80%;
}

.positive {
  border-color: green;
}

.negative {
  border-color: red;
}
</style>
