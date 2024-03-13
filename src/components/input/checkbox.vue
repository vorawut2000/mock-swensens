<template>
  <div>
    <input type="checkbox" v-model="model" :id="id" :disabled="disabled" />
    <label :for="id">
      <font-awesome-icon
        v-if="model"
        :icon="['fas', 'circle-check']"
        class="icon check"
      />
      <font-awesome-icon v-else :icon="['far', 'circle']" class="icon" :class="[disabled && 'disabled']" />
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
input {
  display: none;
}

.icon {
  font-size: 14px;
  margin-right: 5px;
  color: #e21c23;
  &.check {
    color: #e21c23;
    background: white;
    
  }
  &.disabled  {
    color: #e21c23;
  }
}

label {
  display: flex;
}
</style>
