<template>
  <div class="content" style="background: white;">
    <div class="nav action" @click="back">
      返回
    </div>
    <div class="body">
      <div class="box action" id="hero" @click="nextPage">下一页{{ id }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    back() {
      this.$router.back();
    },
    nextPage() {
      this.$router.push("Matryoshka", { id: this.id + 1 });
    },
  },
};
</script>

<style>
.content {
  flex: 1;
  display: flex;
  font-size: 18px;
  flex-direction: column;
}
.nav {
  height: 60px;
  border-bottom: 1px solid gray;
  text-align: left;
  width: 100%;
  line-height: 60px;
}
.body {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  box-sizing: border-box;
  height: 160px;
  width: 100%;
  line-height: 160px;
  text-align: center;
  line-height: 160px;
  border-radius: 20px;
  border: 1px solid gray;
}
</style>
