<template>
  <div class="relative h-full">
    <!-- Admin Page -->
    <!-- <h2 class="text-2xl text-center font-bold">レイナ　の　ブログ　管理</h2> -->
    <!-- <AdminLogin class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> -->

    <!-- finish -->
    <AdminWelcome v-if="activeKey === 'Home'" />

    <AdminUser v-if="activeKey === 'User'" />

    <AdminArticle v-if="activeKey === 'Article'" />

    <AdminComment v-if="activeKey === 'Comment'" />

    <AdminCategory v-if="activeKey === 'Category'" />

    <AdminTag v-if="activeKey === 'Tag'" />

    <AdminBulletin v-if="activeKey === 'Bulletin'" />

    <AdminLink v-if="activeKey === 'Link'" />

    <!--  -->

  </div>
</template>

<script setup lang="ts">
defineProps({
  activeKey: {
    type: String,
    default: 'Home'
  }
})
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: admin
</route>
