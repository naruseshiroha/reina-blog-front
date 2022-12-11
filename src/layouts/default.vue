<template>
  <div class="px-6 h-screen">
    <n-layout class="h-full">
      <div class="h-full flex flex-col nowrap">
        <n-layout-header class="py-4 bg-transparent">
          <MyHeader />
        </n-layout-header>
        <n-layout has-sider>
          <n-grid :cols="7">
            <n-gi :span="5" class="border-2 border-black-50">
              <n-layout-content class="m-6">
                <RouterView />
              </n-layout-content>
            </n-gi>
            <n-gi :span="2" class="px-3 border-2 border-black-50 flex">
              <n-layout-sider class="flex-1">
                <MySider />
              </n-layout-sider>
            </n-gi>
          </n-grid>
        </n-layout>
        <n-layout-footer class="text-center p-6">
          <MyFooter />
        </n-layout-footer>
      </div>
    </n-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// .mylayout {
// :deep(.n-layout > .n-layout-scroll-container) {
// background-color: pink !important;
// }
// display: flex;
// flex-flow: column nowrap;
// }
.my-layout {
  background-color: pink;
}
</style>
