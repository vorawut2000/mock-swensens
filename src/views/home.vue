<template>
  <div>
    <div style="position: relative">
      <div class="banner">
        <div class="container">
          <div class="column-content">
            <div class="heading">
              สมัครเป็นสมาชิก สเวนเซ่นส์วันนี้
              พร้อมรับสิทธิพิเศษมากมายรอคุณอยู่ที่นี่
            </div>
            <div class="description">
              พิเศษสุดๆ! สำหรับสมาชิกสเวนเซ่นส์ ยิ่งกิน ยิ่งได้ ยิ่งคุ้ม ใครๆ
              ก็สมัครได้
              ใช้ง่ายสะดวกสบายพร้อมสิทธิประโยชน์มากมายเพื่อคนสำคัญเช่นคุณ
              รอไม่ได้แล้ว สมัครเลย
            </div>
            <div class="button-container">
              <Button>สั่งออนไลน์</Button>
            </div>
          </div>
          <div class="column-content">
            <img
              src="../assets/images/banner-image.svg"
              alt=""
              class="banner-image"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="body-container">
        <div class="body-header">ดีลสุดคุ้ม</div>
        <div class="container-tabs">
          <ul class="nav-tabs">
            <li v-for="n in 2">
              <div class="tap-container">
                <div class="tabs-image">
                  <img alt="" src="../assets/images/promotion.jpeg" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="body-container">
        <div class="body-header">ข่าว</div>
      </div>
    </div>

    <div class="page-bottom">
      <div class="container">
        <div class="column-content">
          <img
            alt=""
            src="../assets/images/app-screen-webp.webp"
            class="app-screen"
          />
        </div>
        <div class="download">
          ดาวน์โหลดที่
          <div>
            <span
              ><img
                style="width: 30%; margin: 0 12px"
                alt=""
                src="../assets/images/google-play.png"
            /></span>
            <span
              ><img
                style="width: 30%; margin: 0 12px"
                src="../assets/images/app-store.png"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.banner {
  color: #fff;
  padding: 100px 0;
  background: linear-gradient(180deg, #ff807c, #fd4b47);
  @media (max-width: 820px) {
    padding: 0 0 100px 0;
  }
}
.container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 990px) {
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
    text-align: center;

  }
}

.column-content {
  flex: 1;
  padding: 0 50px;

  @media (max-width: 768px) {
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .heading {
    color: inherit;
    font-size: 50px;
    line-height: 1.25;
    text-transform: uppercase;
    margin: 0;
    font-weight: 500;
  }
  @media (max-width: 1200px) {
    .heading {
      font-size: 40px;
    }
  }
  .description {
    margin-top: 20px;
    font-size: 20px;
  }
  .button-container {
    display: block;
    width: 50%;
    margin-top: 40px;
  }
}
.banner-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
.page-body {
  padding: 64px 0 80px;
  .body-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .body-header {
    font-size: 32px;
    padding: 0 24px;
  }
}

.tabs-image {
  position: relative;
  border-radius: 12px;
  height: 100%;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}

.nav-tabs li:last-child {
    padding-right: 10px;
}
.nav-tabs li:first-child {
  padding-left: 10px;
}
.nav-tabs li {
  display: inline-block;
    padding-right: 20px;
}
.nav-tabs {
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.nav-tabs::-webkit-scrollbar {
  display: none;
}
.container-tabs {
  height: 100px;
}
.tap-container {
  display: flex;
  width: 225px;
  margin-top: 12px;
  padding-right: 12px;
  border-right: 2px solid var(--grey3);
}
.app-screen {
  display: block;
  width: 100%;
  height: auto;
  @media (max-width: 990px) {
    transform: translateX(-1rem);
  }
}
.download {
  flex: 1;
  font-size: 40px;
  margin-bottom: 24px;
}
.page-bottom {
  background-image: url(../assets/images/bg-page-bottom.jpg);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 70px;
}
</style>
