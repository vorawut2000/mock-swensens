<template>
  <div id="app">
    <NavTop />
    <router-view v-slot="{ Component }">
      <component :is="Component" class="app-container" />
    </router-view>
    <Footer />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Footer from "./components/footer/footer.vue";
import NavTop from "./components/navbar/nav-top.vue";
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  margin: 0 auto;
}

@media screen and (max-width: 280px) {
  * {
    font-size: 18px;
  }
}
</style>
