<template>
  <div class="login-container">
    <Card title="สร้างบัญชี" subTitle="สมัครสมาชิกและเริ่มใช้งาน">
      <div style="display: flex; gap: 20px; margin-bottom: 10px">
        <div>
          <div style="margin-bottom: 5px">ชื่อ</div>
          <div>
            <Input v-model="profile.firstname" placeholder="กรอกชื่อ" validate/>
          </div>
        </div>

        <div>
          <div style="margin-bottom: 5px">นามสกุล</div>
          <div>
            <Input v-model="profile.lastname" placeholder="กรอกนามสกุล" validate/>
          </div>
        </div>
      </div>
      <div>อีเมล</div>
      <div style="margin: 0 0 16px 0">
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
      <div style="margin: 16px 0 5px 0">เพศ (ไม่ระบุได้)</div>
      <div style="width: 85%">
        <OptionInput v-model="profile.gender" :options="genderList" />
      </div>
      <div style="margin: 16px 0 5px 0">ของขวัญวันเกิดรอคุณอยู่</div>
      <Input
        type="date"
        v-model="profile.birthDate"
        placeholder="dd/mm/yyyy"
        style="cursor: pointer"
      />
      <div style="margin: 16px 0 5px 0">
        <Checkbox v-model="profile.policy" id="policy" :disabled="false">
          ฉันได้อ่านและยอมรับ ข้อกำหนดการใช้งาน และ นโยบายความเป็นส่วนตัว
          ของสเวนเซ่นส์
        </Checkbox>
        <Checkbox
          v-model="profile.subscribePolicy"
          id="subscribePolicy"
          :disabled="false"
        >
          ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ
          จากสเวนเซ่นส์และบริษัทในเครือ โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ
          สามารถศึกษาเงื่อนไขหรือข้อตกลง นโยบายความเป็นส่วนตัว
          เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ
        </Checkbox>
      </div>
      <div class="button-container">
        <Button plainBG @click="registerWithEmail">สมัครสมาชิก</Button>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import Card from "../components/card/card.vue";
import OptionInput from "../components/input/option-input.vue";
import Checkbox from "../components/input/checkbox.vue";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useRouter } from "vue-router";

const user = ref(null);

const router = useRouter()

const profile = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  gender: "",
  policy: null,
  subscribePolicy: null,
});

const genderList = ref([
  { id: 1, name: "ชาย" },
  { id: 2, name: "หญิง" },
  { id: 3, name: "ไม่ระบุ" },
]);

const showError = ref(false);
const handleError = (value) => {
  showError.value = value;
};

const registerWithEmail = async () => {
  try {
    const result = await createUserWithEmailAndPassword(auth, profile.email, profile.password);
    user.value = result.user;
    router.push({name: "login"}).catch(()=> {})
  } catch (error) {
    alert(error.message);
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
../firebase
