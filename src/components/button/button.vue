<template>
  <button
    class="button ellipsis"
    :class="[
      disabled && 'disabled',
      inactive && 'inactive',
      image && 'image',
      plain && 'plain',
      plainBG && 'plain bg',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    plainBG: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  width: 100%;

  display: inline-block;
  text-align: center;
  align-items: center;

  margin: 0;
  padding: 8px 10px;

  border: none;
  border-radius: 25px;

  background-color: #ffffff;

  box-shadow: 0px 2px 6px #000000;

  color: #e21c23;
  font-size: 22px;
  font-family: Kanit, sans-serif;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e21c23;
    color: #ffffff;
  }
  &.disabled {
    pointer-events: none;

    background: none;
    background-color: #bfbfbf;
    cursor: not-allowed;
  }
  &.inactive {
    background-color: #9a9a9a;
    color: #fff;
  }
  &.plain {
    font-size: 14px;
    border-radius: 50px;
    color: #e21c23;
    background-color: #fff;
    border: 1px solid #e21c23;
    font-weight: 300;
    background-image: none;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    padding: 0 25px;
    height: 48px;
    &.bg {
      background-color: #e21c23;
      color: #fff;
    }
  }
}
</style>
