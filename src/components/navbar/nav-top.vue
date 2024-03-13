<template>
  <div v-if="screenWidth.shouldHideContent">
    <div class="navigation-top" tabindex="0">
      <div class="navigation-top-left-container">
        <img
          alt=""
          src="../../assets/images/logos/swensen-logo.svg"
          class="header-logo pointer"
          @click="$router.push({ name: 'home' })"
        />
      </div>
      <div class="navigation-top-right-container">
        <div class="menu-list">
          <img
            alt=""
            src="../../assets/images/icon-location.svg"
            class="icon"
          />
          กรุณาเลือกที่อยู่จัดส่ง
        </div>
        <div  v-if="userStore.user.isLoggedIn" style="margin-right: 10px;">ยินดีต้อนรับ {{ userStore.user.username }}</div>
        <div v-else style="display: flex">
          <div class="menu-list">
            <Button plain @click="$router.push({ name: 'register' })"
              >สมัครสมาชิก</Button
            >
          </div>
          <div class="menu-list">
            <Button plainBG @click="$router.push({ name: 'login' })"
              >เข้าสู่ระบบ</Button
            >
          </div>
        </div>
        <div class="menu-list">TH</div>
      </div>
    </div>
  </div>
  <div v-else>
    <div
      class="navigation-top"
      tabindex="0"
      style="position: relative; top: -10px"
    >
      <div class="navigation-top-left-container">
        <img
          alt=""
          src="../../assets/images/icon-scan-black.svg"
          class="icon"
        />
      </div>
      <div class="navigation-top-center-container">
        <img
          alt=""
          src="../../assets/images/logos/swensen-logo.svg"
          class="header-logo"
        />
      </div>
      <div class="navigation-top-right-container">
        <div class="menu-list">
          <img alt="" src="../../assets/images/icon-bag.svg" class="icon" />
        </div>
        <div class="menu-list">
          <img
            alt=""
            src="../../assets/images/menu.svg"
            class="icon"
            @click="openSidebar"
          />
        </div>
        <div
          class="sidebar-container"
          v-show="showSidebar"
          @click="closeSidebar"
        >
          <div class="sidebar-content" @click.stop>
            <p>ยินดีต้อนรับ</p>
            <Button plain @click="closeSidebarAndNavigate('login')"
              >เข้าสู่ระบบ</Button
            >
            <Button plain @click="closeSidebarAndNavigate('register')"
              >สมัครสมาชิก</Button
            >
          </div>
        </div>
        <div class="address">
          <div class="menu-list">
            <img
              alt=""
              src="../../assets/images/icon-location.svg"
              class="icon"
            />
            กรุณาเลือกที่อยู่จัดส่ง
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const router = useRouter();

const isLoggedIn = ref(sessionStorage.getItem("isLoggedIn"));

const screenWidth = reactive({
  shouldHideContent: false,
});

const showSidebar = ref(false);

const openSidebar = () => {
  showSidebar.value = true;
  console.log("true");
};
const closeSidebar = () => {
  showSidebar.value = false;
};
const closeSidebarAndNavigate = (routeName) => {
  showSidebar.value = false;
  router.push({ name: routeName });
};

onMounted(() => {
  screenWidth.shouldHideContent = window.innerWidth > 820;
});

window.addEventListener("resize", () => {
  screenWidth.shouldHideContent = window.innerWidth > 820;
});
</script>

<style lang="scss" scoped>
.navigation-top {
  height: 72px;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  position: sticky;
  width: 100%;
  z-index: 100;
  @media (max-width: 820px) {
    height: 102px;
    padding: 0;
  }
}
.navigation-top-left-container {
  height: auto;
  .header-logo {
    width: 105px;
    height: auto;
    padding-left: 24px;
  }
  .icon {
    width: 32px;
    height: auto;
    padding-left: 24px;
  }
}
.navigation-top-center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: auto;

  .header-logo {
    display: block;
    margin: auto;
    width: 105px;
    height: auto;
    align-items: center;
  }
}

.navigation-top-right-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  height: auto;
  color: #000000;
}
.menu-list {
  margin-right: 24px;
  display: flex;
}
.address {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  content: "";
}
.sidebar-container {
  position: fixed;
  top: 0;
  right: 0; 
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  z-index: 101;
}

.sidebar-content {
  background-color: #fff;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-content p {
  font-size: 18px;
  margin-bottom: 16px;
}

.sidebar-content Button {
  margin-right: 8px;
}
</style>
