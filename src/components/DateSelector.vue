<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="value"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="value"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="temp" no-title scrollable @click="handleClick">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="handleClick"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateSelector",
  props: {
    value: String,
    label: String,
  },
  data() {
    return {
      temp: this.value,
      menu: false,
    };
  },
  methods: {
    handleClick() {
      this.$refs.menu.save(this.temp);
      this.$emit("input", this.temp);
    },
  },
};
</script>

<style lang="scss" scoped></style>
