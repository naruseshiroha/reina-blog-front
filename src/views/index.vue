<template>
  <div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
    Welcome Content <br>
    <!-- bottom: {{ props.isBottom }} <br> -->
    <!-- top: {{ props.top }} <br> -->
    <span v-if="top">
      已经到顶了哦！
    </span> <br>
    top: {{ top }} <br>
    bottom: {{ bottom }} <br>

    <span v-if="bottom">
      已经到底了哦！
    </span> <br>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
})

</script>

<style lang="scss" scoped></style>
