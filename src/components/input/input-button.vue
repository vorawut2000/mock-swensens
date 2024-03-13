<template>
  <div class="input-container" :class="[disabled && 'disabled']">
    <div class="box" :class="[disabled && 'disabled', isFilled && 'filled']">
      <input
        v-model="model"
        :type="showPassword ? 'text' : type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :class="[icon && 'with-icon']"
        class="input"
      />
      <div>
        <img
          v-if="password"
          class="icon"
          alt=""
          :src="imageSrc(showPassword ? 'view' : 'hide')"
          @click="togglePassword"
        />
      </div>
    </div>
    <div v-if="error" class="error-description">
      {{ errorsMessage[props.key] }}
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watchEffect } from "vue";

const props = defineProps({
  modelValue: String,
  icon: String,
  button: String,
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
  password: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  information: {
    type: String,
    default: "",
  },
  modalType: {
    type: String,
    default: "exclamation",
  },
  modalTitle: {
    type: String,
    default: "เกิดข้อผิดพลาด",
  },
  modalBody: {
    type: String,
    default: "เกิดข้อผิดพลาด",
  },
  modalConfirm: {
    type: String,
    default: "ปิด",
  },
  maxlength: Number,
  showError: Boolean,
});

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const emit = defineEmits(["update:modelValue", "error"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isFilled = computed(() =>
  // props.error === false ?
  model.value ? true : false
);

const imageSrc = (type) => {
  const allImages = import.meta.glob("../../assets/images/*.png", {
    eager: true,
  });
  return allImages[`../../assets/images/${type}.png`]?.default;
};
</script>

<style lang="scss" scoped>
.info-password {
  color: var(--black);
  margin: 6px 5%;
  display: flex;
  font-size: 16px;
  .info-icon {
    color: var(--green5);
    font-size: 20px;
    margin-right: 5px;
  }
}

.input-container {
  position: relative;
  width: 100%;
  // margin-top: 16px;
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
}
.icon {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
}

.button {
  width: 80px;
  height: 30px;
  position: absolute;
  top: 11px;
  right: 15px;

  font-size: 22px;
  font-weight: normal;
  display: flex;
  justify-content: center;
}
.error-description {
  color: var(--red);
  padding-left: 12px;
}
</style>
