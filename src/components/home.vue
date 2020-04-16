<template>
  <div class="page">
    <div
      v-for="item in 50"
      :key="item"
      class="list action"
      :id="item"
      @click="tap(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tap(item) {
      this.$router.push("Matryoshka", { id: item });
    },
  },
};
</script>

<style>
.page {
  flex: 1;
  overflow: scroll;
  padding: 15px;
  background: #eee;
}
.list {
  margin: 15px;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  background: white;
  border-radius: 10px;
}
</style>
