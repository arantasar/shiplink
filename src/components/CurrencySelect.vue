<template>
  <div
    @click="handleClick"
    class="currency ma-2 pa-4"
    :class="{ isGrayScaled: !isSelected }"
  >
    <img class="flag" :src="flag" />
    <div class="font-weight-bold text-center">
      {{ currency.code }}
    </div>
  </div>
</template>

<script>
import gbp from "@/assets/flags/uk.png";
import eur from "@/assets/flags/eur.webp";
import usd from "@/assets/flags/usd.png";

export default {
  name: "CurrencySelect",
  props: {
    currency: Object,
    isSelected: Boolean,
  },
  computed: {
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
  methods: {
    handleClick() {
      this.$emit("toggleCurrency", this.currency.code);
    },
  },
};
</script>

<style lang="scss" scoped>
.currency {
  border: 1px solid blue;
  border-radius: 25px;

  &:hover {
    cursor: pointer;
    border-color: darkblue;
    box-shadow: 0 0 5px blue;
  }
}

.flag {
  width: 100px;
  height: 60px;
  object-fit: contain;
}

.isGrayScaled {
  filter: grayscale(1);
}
</style>
