<template>
  <CustomNavbar
    :title="title"
    :placeholder="placeholder"
    @leftClick="leftClick"
  ></CustomNavbar>
</template>

<script setup>
import CustomNavbar from "./custom-navbar.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["leftClick"]);

function leftClick() {
  emits("leftClick");
}
</script>

<style lang="scss" scoped></style>
