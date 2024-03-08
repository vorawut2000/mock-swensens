<template>
  <div class="navigation-top" tabindex="0">
    <div class="navigation-top-left-container">
      <img
        alt=""
        src="../../assets/images/logos/swensen-logo.svg"
        class="header-logo"
      />
    </div>
    <div class="navigation-top-right-container">
      <div>test1</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const handleBack = () => {
  if (route.query.backTo) return router.push({ name: route.query.backTo });
  router.push({ name: route.meta.backTo });
};
</script>

<style lang="scss" scoped>
.navigation-top {
  z-index: 90;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
}
.navigation-top-left-container {
  position: absolute;
  left: 25px;
  height: auto;
  .header-logo {
    width: 105px;
    height: auto;
  }
}
.navigation-top-right-container {
  position: absolute;
  right: 25px;
  height: auto;

  color: white;
}
</style>
