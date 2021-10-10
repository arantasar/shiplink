<template>
  <v-dialog :value="value" max-width="400" @click:outside="handleClick">
    <v-card>
      <v-card-title class="text-h5"> Welcome to CheckRate! </v-card-title>

      <v-card-text>
        <p class="mt-4">
          Welcome to CheckRate! - simple app for checking the average currency
          rate for PLN. The upper section displays recent changes is the average
          rate for the most common currencies, together with comparisons with
          yesterday
        </p>
        <p>
          The lower section displays rate for the last 30 days. You can adjust
          data displayed by a) changing visible currencies and b) changing
          displayed period (this triggers new API call). Give it a try!
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" text @click="handleClick"> Begin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  methods: {
    handleClick() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
