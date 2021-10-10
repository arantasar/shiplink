<template>
  <v-app-bar app color="primary" flat dark>
    <div class="logo">CheckRate!</div>

    <v-spacer></v-spacer>

    <v-btn href="https://github.com/arantasar/shiplink" target="_blank" text>
      <span class="mr-2">GitHub Repo</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2rem;
}
</style>
