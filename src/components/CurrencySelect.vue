<template>
  <div
    @click="handleClick"
    class="currency ma-2 pa-4"
    :class="{ isGrayScaled: !isSelected }"
  >
    <div>Flag</div>
    <div class="body-1">
      {{ currency.code }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrencySelect",
  props: {
    currency: Object,
    isSelected: Boolean,
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

.isGrayScaled {
  filter: grayscale(1);
}
</style>
