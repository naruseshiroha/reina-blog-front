<template>
  <div ref="scrollBox" class="mydefault min-h-screen flex flex-col nowrap">
    <header class="header text-center">
      <MyHeader />
    </header>
    <main class="border flex-1 flex">
      <n-grid cols="11" item-responsive>
        <n-grid-item :span="7">
          <main style="padding: 0.5rem" class="h-full p-4">
            <RouterView :top="top" :bottom="bottom" />
          </main>
        </n-grid-item>
        <n-grid-item :span="4">
          <aside>
            <MyAside />
          </aside>
          <!-- <aside class="h-full p-4 m-2">Aside</aside> -->
        </n-grid-item>
      </n-grid>
      <!-- <div class="border flex-1">content</div>
      <aside class="border">aside</aside> -->
    </main>
    <footer class="border">
      <n-back-top :right="50" />
      Footer
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core';
const scrollBox = ref(null);
const {x, y, arrivedState } = useScroll(scrollBox);
const {top, bottom} = toRefs(arrivedState)
</script>

<style lang="scss" scoped>
.mydefault {
  overflow: auto;
  width: 100vw;
  height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99999;
  background-color: white;
}
</style>
