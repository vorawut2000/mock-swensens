<template>
  <div class="input-container" :class="[disabled && 'disabled']">
    <div class="input-title" v-if="model">{{ title }}</div>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :class="[
        icon && 'with-icon',
        isFilled && 'filled',
        error[props.key] && 'error',
        camera && 'camera'
      ]"
      @keypress="handleKeypress"
      @paste="checkPaste"
      @input="idcardFormatter"
    />
    <font-awesome-icon
      v-if="icon"
      :icon="['far', icon]"
      class="icon"
      :class="[disabled && 'disabled']"
    />
    <font-awesome-icon
      v-if="camera"
      :icon="['far', 'camera']"
      class="camera-icon"
      @click="handleCamera"
    />
    <div v-if="error" class="error-description">
      {{ errorsMessage[props.key] }}
    </div>
    <div v-if="information" class="info">
      <font-awesome-icon
        :icon="['far', 'circle-info']"
        style="color: var(--green5); font-size: 24; "
        class="info-icon"
      />
      <span style="padding: 0px 0px 0px 0px; margin: 0px; font-size: 16px;  position: relative;">{{ information }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect, inject } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  modelValue: String,
  icon: String,
  type: {
    type: String,
    default: "text",
  },
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  information: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  validate: {
    type: Boolean,
    default: false,
  },
  validateIdCard: {
    type: Boolean,
    default: false,
  },
  validateEmail: {
    type: Boolean,
    default: false,
  },
  camera: {
    type: Boolean,
    default: false,
  },
  privilegeId: { type: Number, default: null },
  maxlength: Number,
  showError: Boolean,
});

const language = inject("language")

const router = useRouter();

const emit = defineEmits(["update:modelValue", "error"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isFilled = computed(() =>
  // props.error === false ?
  model.value ? true : false
);

const handleCamera = () => {
  router.push({ name: "scancode" }).catch(() => {});
  modal.hide();
};

let lastChar = "";
const errorsMessage = ref({});
const error = ref({});

const numbersOnly = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};

//IdCardInput
const idcardFormatter = (event) => {
  if (props.validateIdCard) {
    delete errorsMessage.value[props.key];
    delete error.value[props.key];
    let id = event.target.value;
    if (id.length === 13) {
      var result = Script_checkID(id);
      if (result) {
        error.value[props.key] = false;
      } else {
        error.value[props.key] = true;
        errorsMessage.value[props.key] = language.get({th: "*รหัสบัตรประชาชนไม่ถูกต้อง", en: "Identity number is incorrect"});
      }
    } else {
      error.value[props.key] = true;
      errorsMessage.value[props.key] = language.get({th: "*รหัสบัตรประชาชนไม่ถูกต้อง", en: "Identity number is incorrect"});
    }
  }
};
const Script_checkID = (id) => {
  if (!IsNumeric(id)) return false;
  if (id.substring(0, 1) == 0) return false;
  if (id.length != 13) return false;

  let i = 0;
  let sum = 0;
  for (i = 0, sum = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i);
  if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
  return true;
};
function IsNumeric(input) {
  var RE =
    /^-?(0|INF|(0[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;
  return RE.test(input);
}

const validateForm = () => {
  const validateName = (name, key, maxLen) => {
    delete errorsMessage.value[key];
    delete error.value[key];

    if (!name) {
      errorsMessage.value[key] = " ";
    } else if (!/^[a-zA-Zก-๏\s]+$/.test(name) || name.includes("฿")) {
      errorsMessage.value[key] = "*Invalid characters are not allowed";
      emit("error", true);
    } else if (name.length > maxLen) {
      errorsMessage.value[key] = `Name must not exceed ${maxLen} characters`;
    } else {
      emit("error", false);
      error.value[key] = false;
    }
  };

  const validateEmail = (email, key) => {
    delete errorsMessage.value[key];
    delete error.value[key];

    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    if (!email || email.trim() === "") {
      error.value[key] = false;
    } else if (!isValidEmail) {
      error.value[key] = true;
      errorsMessage.value[key] = "*โปรดใส่อีเมลที่ถูกต้อง";
    } else {
      error.value[key] = false;
    }
  };

  validateName(model.value, props.key, 40);
  if (props.validateEmail) {
    validateEmail(model.value, props.key);
  }
};

const validateInput = (event) => {
  const charCode = event.which || event.keyCode;
  const char = String.fromCharCode(charCode);
  const thaiRegex = /[ก-๙]/;
  const englishRegex = /[a-zA-Z]/;
  const spacebarRegex = /\s/;
  const inputValue = event.target.value + char;
  validateForm();

  switch (true) {
    case !thaiRegex.test(char) &&
      !englishRegex.test(char) &&
      !spacebarRegex.test(char) &&
      charCode !== 8:
    case inputValue.trim().length === 0:
    case lastChar === " " && char === " ":
    case !/^[a-zA-Zก-๏\s]*$/.test(inputValue):
    case char === "฿":
      event.preventDefault();
      break;
  }
  lastChar = char;
};

const checkPaste = (event) => {
  setTimeout(() => {
    validateInput(event);
  }, 0);
};

const handleKeypress = (event) => {
  if (props.validate) {
    validateInput(event);
  } else if (props.number) {
    numbersOnly(event);
  } else if (props.validateEmail) {
    validateForm();
  }
};

watchEffect(() => {
  if (props.validate) {
    validateForm();
  }
});
</script>
  
  <style lang="scss" scoped>
  .input-container {
    position: relative;
    width: 100%;
    
    &.disabled {
      pointer-events: none;
    }
  }
  
  input {
    appearance: none;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    outline: none;
    height: 42px;
    box-sizing: border-box;
    padding: 12.5px 16px;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    text-align: left;
    color: #787878;
  
    &::placeholder {
      color: #d2d2d2;
    }
  
    &:disabled {
      color: #888b8d;
      background: #dddddd;
      -webkit-text-fill-color: #7e7e7e;
      opacity: 1;
    }
  
    &.with-icon {
      padding: 12.5px 16px 12.5px 40px;
    }
    &.error {
      border: 2px solid var(--red);
    }
  }
  .icon {
    position: absolute;
    top: 11px;
    left: 16px;
  
    color: var(--berry);
    font-size: 18px;
    line-height: 22px;
  
    &.disabled {
      color: #363636;
    }
    &.error {
      color: var(--red);
    }
  }
  </style>
  