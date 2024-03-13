<template>
  <div class="card-container">
    <div class="card-heading">
      <h2 class="title">{{ title }}</h2>
      <div class="sub-title">{{ subTitle }}</div>
    </div>
    <div class="body">
      <slot/>
    </div>
  </div>
</template>
<script setup>
const props  = defineProps({
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  }
})
</script>
<style lang="scss" scoped>
.card-container {
  max-width: 480px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
  border-radius: 0 0 15px 15px;
}
.card-heading {
  background-image: url(../../assets/images/card-head.png);
  color: #fff;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #dbdbdb;
  background-size: cover;
  background-position: top;
  .title {
    padding-left: 40px;
    font-size: 32px;
    font-weight: 500;
    margin: 0;
  }
  .sub-title {
    padding-left: 40px;
    font-size: 14px;
    font-weight: 300;
  }
}
.body {
  padding: 40px;
  font-size: 14px;
  font-weight: 300;

}
</style>
