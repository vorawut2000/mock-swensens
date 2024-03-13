<template>
  <footer>
    <div class="footer-container">
      <img class="logo" alt="" src="../../assets/images/swensen-white.svg" />
      <div>
        <div class="icon">
          <div v-for="(menu, index) in primaryMenuList" :key="index">
            {{ menu.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="secondary-footer-container">
      <div>
        <img
          class="logo"
          alt=""
          src="../../assets/images/logos/icon-facebook.svg"
        />
        <img
          class="logo"
          alt=""
          src="../../assets/images/logos/icon-instagram.svg"
        />
        <img
          class="logo"
          alt=""
          src="../../assets/images/logos/icon-youtube.svg"
        />
      </div>
      <div>
        <div class="icon">
          <div v-for="(menu, index) in secondaryMenuList" :key="index">
            {{ menu.name }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { onMounted, reactive } from "vue";

const primaryMenuList = reactive([
  {
    name: "ไอศกรีมของเรา",
  },
  {
    name: "สิทธิพิเศษ",
  },
  {
    name: "รีวอร์ด",
  },
  {
    name: "คูปองของฉัน",
  },
  {
    name: "บัตรของขวัญ",
  },
  {
    name: "บัตรสเวนเซ่นการ์ด",
  },
  {
    name: "ข้อมูลของฉัน",
  },
]);

const secondaryMenuList = reactive([
  {
    name: "คำถามที่พบบ่อย",
  },
  {
    name: "ข้อกำหนดการใช้งาน",
  },
  {
    name: "นโยบายความเป็นส่วนตัว",
  },
]);

const screenWidth = reactive({
  shouldHideContent: false,
});

onMounted(() => {
  screenWidth.shouldHideContent = window.innerWidth > 1024;
});

window.addEventListener("resize", () => {
  screenWidth.shouldHideContent = window.innerWidth > 1024;
});
</script>
<style scoped lang="scss">
.footer-container {

  background-color: #e21c23;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
    font-size: 16px;
  }
  .logo {
    width: 160px;
    height: auto;
    display: block;
    @media (max-width: 820px) {
      margin-bottom: 40px;
    }
  }
  .icon {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    @media (max-width: 820px) {
      justify-content: center;
    }
  }
}

.secondary-footer-container {
  background-color: #cb191f;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
    font-size: 16px;
  }
  .logo {
    width: 25px;
    height: auto;
    margin-right: 16px;
  }
  .icon {
    display: flex;
    gap: 16px;
    font-size: 16px;
    font-weight: 300;
    color: #ffffff;
    flex-wrap: wrap;
    @media (max-width: 820px) {
      justify-content: center;
    }
  }
}
</style>
