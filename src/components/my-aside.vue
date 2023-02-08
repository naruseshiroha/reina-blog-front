<template>
  <div class="aside">
    <!-- search -->
    <n-input-group>
      <n-input maxlength="20" placeholder="请输入关键字进行搜索" show-count clearable />
      <n-button type="primary" ghost>搜索</n-button>
    </n-input-group>

    <Login />

    <Comment />

    <Rank />

    <Random />

    <Tag />
  </div>
</template>

<script setup lang="ts">
import Login from "/@/views/login/index.vue";
</script>

<style lang="scss" scoped></style>
