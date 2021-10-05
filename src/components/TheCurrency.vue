<template>
  <div
    class="currency pa-4 ma-2 d-flex"
    :class="{ positive: difference > 0, negative: difference < 0 }"
  >
    <div class="content d-flex flex-column align-center">
      <div>Flag</div>
      <div>{{ currency.code }}</div>
      <div>{{ currency.today }}</div>
      <div>{{ difference }}</div>
    </div>
    <the-arrow :difference="difference" />
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="scss" scoped>
.currency {
  border: 1px solid lightgrey;
  border-radius: 25px;
}

.positive {
  border-color: green;
}

.negative {
  border-color: red;
}
</style>
