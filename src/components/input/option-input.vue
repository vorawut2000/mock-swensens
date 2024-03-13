<template>
  <div class="default-address">
    <div v-for="(item, index) in options" :key="index" style="width: 100%">
      <label
        :for="item.id"
        class="location-type"
        :class="model === item ? 'selected' : ''"
      >
        <div>
          <input type="radio" v-model="model" :value="item" :id="item.id" />
          {{ item.name }}
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: [Number, String, Object, Boolean],
  id: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.default-address {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4%;
}
.location-type {
  height: 43.5px;
  font-size: 18px;
  color: #e21c23;

  display: flex;
  justify-content: center;
  align-items: center;
font-size: 14px;
  border-radius: 50px;
  border: 0.5px solid #ededed;
  &.selected {
    color: #ffff;
    background-color: #e21c23;
  }
}
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input {
  display: none;
}
</style>
