<template>
  <div class="min-h-screen flex flex-col nowrap">
    <header class="text-center">
      <MyHeader />
    </header>
    <main class="border flex-1 flex">
      <n-grid cols="7" item-responsive>
        <n-grid-item :span="5">
          <main style="padding: 0.5rem" class="h-full p-4">Content</main>
        </n-grid-item>
        <n-grid-item :span="2">
          <aside>
            <MyAside />
          </aside>
          <!-- <aside class="h-full p-4 m-2">Aside</aside> -->
        </n-grid-item>
      </n-grid>
      <!-- <div class="border flex-1">content</div>
      <aside class="border">aside</aside> -->
    </main>
    <footer class="border">Footer</footer>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
