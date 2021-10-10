<template>
  <v-dialog :value="value.show" width="500" @click:outside="handleClick">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Error </v-card-title>

      <v-card-text class="pt-5">
        {{ value.message }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="handleClick"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    value: Object,
  },
  methods: {
    handleClick() {
      this.$emit("input", { show: false, message: "" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
