<template>
  <div class="select-container">
    <input
      type="text"
      :value="itemText ? modelValue?.[itemText] : modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      readonly
      @click="show = !show"
      @blur="handleBlur"
      :class="[
        error && 'error',
        selected && 'selected',
        isFilled && 'selected',
        icon && 'with-icon',
      ]"
      class="ellipsis-1"
    />
    <font-awesome-icon
      :icon="['fas', 'chevron-down']"
      class="icon"
      :class="[show ? 'rotate-show' : 'rotate-hide']"
    />
    <div v-if="show" class="option-container">
      <div v-if="options.length !== 0">
        <div
          v-for="(item, index) in options"
          :key="index"
          class="option"
          :class="[model === item && 'active']"
          @click="handleSelect(item)"
        >
          {{ itemText ? item[itemText] : item }}
        </div>
      </div>
      <div
        v-else
      >
        {{ noDataText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: [Number, String, Object],
  icon: String,
  error: {
    type: Boolean,
    default: false,
  },
  itemText: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: [],
  },
  placeholder: {
    type: String,
    default: "",
  },
  noDataText: {
    type: String,
    default: "ไม่มีข้อมูล",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected = ref(false);
const show = ref(false);
const model = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newVal) => {
    model.value = newVal;
  }
);
const handleSelect = (value) => {
  model.value = value;
  show.value = false;
  emit("update:modelValue", model.value);
  selected.value = true;
};
const handleBlur = () => {
  setTimeout(() => {
    show.value = false;
  }, 100);
};
const isFilled = computed(() =>
  props.error === false ? model.value ?? 0 > 2 : false
);
</script>

<style lang="scss" scoped>
.select-container {
  position: relative;
  width: 100%;
}
input {
  appearance: none;
  border-radius: 10px;
  border: 1px solid white;
  outline: none;
  height: 42px;
  box-sizing: border-box;
  padding: 12.5px 30px 12.5px 16px;
  width: 100%;

  font-size: 22px;
  text-align: left;
  color: var(--grey);

  &::placeholder {
    color: var(--grey);
  }

  &:disabled {
    color: #888b8d;
    background: #bbbcbc;
    -webkit-text-fill-color: #a09f9f;
    opacity: 1;
  }
  &.selected {
    color: var(--black);
  }
  &.with-icon {
    padding: 12.5px 16px 12.5px 45px;
  }
}
.front-icon {
  position: absolute;
  top: 11px;
  left: 16px;

  color: var(--berry);
  font-size: 18px;
  line-height: 22px;

  &.disabled {
    color: #363636;
  }
}

.icon {
  position: absolute;
  top: 11px;
  right: 16px;

  width: 14px;
  color: var(--berry);
  &.rotate-show {
    transform: rotate(0.5turn);
    transition: transform 0.25s;
  }
  &.rotate-hide {
    transform: rotate(0turn);
    transition: transform 0.25s;
  }
}

.option-container {
  z-index: 50;

  position: absolute;
  top: 50px;
  left: 0;

  border-radius: 8px;

  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  text-align: left;

  background-color: #ffffff;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #bfbfbf;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background: var(--berry);
  }
}

.option {
  padding: 5px 10px;
  border-bottom: 1px solid #eeeeee;
  color: #000000;
  font-size: 22px;
  font-weight: 300;
  line-height: 18px;
  height: 32px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #bfbfbf;
    color: var(--white);
  }
  &.active {
    background: var(--blue-gradient);
    color: white;
  }
}
</style>
