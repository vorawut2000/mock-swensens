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
        ]"
        @keypress="handleKeypress"
      />
      <div v-if="error" class="error-description">
        {{ errorsMessage[props.key] }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watchEffect, inject } from "vue";
  
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
  
  const emit = defineEmits(["update:modelValue", "error"]);
  
  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  });
  
  const isFilled = computed(() =>
    // props.error === false ?
    model.value ? true : false
  );
  
  const errorsMessage = ref({});
  const error = ref({});
  
  const validateForm = () => {
    const validateEmail = (email, key) => {
      delete errorsMessage.value[key];
      delete error.value[key];
  
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  
      if (!email || email.trim() === "") {
        error.value[key] = false;
      } else if (!isValidEmail) {
        error.value[key] = true;
        errorsMessage.value[key] = "อีเมลไม่ถูกต้อง";
      } else {
        error.value[key] = false;
      }
    };
  
    validateEmail(model.value, props.key);
  };
  
  watchEffect(() => {
      validateForm();
  });
  </script>
  
  <style lang="scss" scoped>
  .input-container {
    position: relative;
    width: 100%;
    .input-title {
      color: var(--black);
      padding: 8px 0 0px 26px;
  
      position: absolute;
    }
  
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
      color: var(--grey6);
      background: var(--grey1);
      -webkit-text-fill-color: var(--grey6);
      opacity: 1;
    }
  
    &.filled {
      padding-top: 16px;
      border-color: var(--grey1);
      // border-color: red;
    }
    &.error {
      border: 1px solid  #f5222d;
    }
    &.camera {
      padding-right: 60px;
    }
  }
  .icon {
    position: absolute;
    top: 16px;
    right: 26px;
  
    color: var(--green5);
    font-size: 20px;
    line-height: 22px;
  
    &.disabled {
      color: var(--grey6);
    }
  }
  
  .camera-icon {
    position: absolute;
    background-color: var(--green5);
    color: white;
    padding: 10px;
    border-radius: 50px;
    top: 8px;
    right: 8px;
  }
  
  .error-description {
    color: #f5222d;
    padding: 5px 0 0 12px;
  }
  
  .info {
    width: 90%;
    display: flex;
    color: white;
    font-size: 16px;
    margin: 0 auto;
    padding-top: 6px;
  
    .info-icon {
      padding-right: 10px;
    }
  }
  </style>
  