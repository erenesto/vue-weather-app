<template>
  <div class="search">
    <h3>Search for a city</h3>
    <input type="text" @keyup.enter="handleInput" v-model="query" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    };
  },
  methods: {
    handleInput() {
      this.$emit('searchForCity', this.query);
      this.query = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
