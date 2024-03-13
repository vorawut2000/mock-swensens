<template>
  <div class="login-container">
    <Card title="ยินดีต้อนรับ" subTitle="เข้าสู่ระบบเพื่อใช้งาน">
      <div>อีเมล</div>
      <div style="margin: 5px 0 16px 0">
        <EmailInput
          v-model="profile.email"
          key="email"
          validateEmail
          type="text"
          placeholder="กรอกอีเมล"
          :maxlength="40"
          @error="handleError"
        />
      </div>
      <div>รหัสผ่าน</div>
      <div>
        <InputButton
          type="password"
          v-model="profile.password"
          title="รหัสผ่าน"
          placeholder="กรอกรหัสผ่าน"
          password
        />
      </div>
      <div class="forget-password">ลืมรหัสผ่าน</div>
      <div class="button-container">
        <Button plainBG @click="signInWithEmail">เข้าสู่ระบบ</Button>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import Card from "../components/card/card.vue";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useRouter } from "vue-router";

import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const profile = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const showError = ref(false);
const handleError = (value) => {
  showError.value = value;
};


const signInWithEmail = async () => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      profile.email,
      profile.password
    );
    console.log(result)
    userStore.user.isLoggedIn = true;
    userStore.user.username = result.user.email;
    router.push({name: "home"}).catch(() => {})
  } catch (error) {
    alert(error.message);
    console.log(error)
  }
};

</script>
<style lang="scss" scoped>
.login-container {
  padding: 40px 0;
  min-height: 70vh;
}
.button-container {
  margin-top: 24px;
}
.forget-password {
  line-height: 1.5;
  margin-top: 24px;
  color: #f5222d;
  display: flex;
  justify-content: flex-end;
}
</style>
