<template>
  <div class="icon d-flex alignt-center justify-center ml-2">
    <v-icon v-if="difference > 0" x-large color="green darken-2">
      mdi-arrow-up-bold
    </v-icon>
    <v-icon v-else-if="difference < 0" large color="red darken-2">
      mdi-arrow-down-bold
    </v-icon>
    <v-icon v-else large color="gray"> mdi-arrow-up-down-bold </v-icon>
  </div>
</template>

<script>
export default {
  name: "TheArrow",
  props: {
    difference: String,
  },
};
</script>

<style lang="scss" scoped></style>
