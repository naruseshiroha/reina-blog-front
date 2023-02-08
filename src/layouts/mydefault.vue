<template>
  <div ref="scrollBox" class="mydefault min-h-screen flex flex-col nowrap">
    <header ref="headerRef" class="header text-center">
      <!--<br>
      hasScrollBar {{ hasScrollBar }} ,,
      bottom {{ bottom }},, x {{ x }}, y {{  y  }},
      msize {{ mainSize.height }} -->
      <MyHeader />
    </header>
    <main class="border flex-1 flex">
      <n-grid cols="11" item-responsive>
        <n-grid-item :span="hasAside ? 7 : 11">
          <main ref="mainBox" style="padding: 0.5rem" class="h-full p-4">
            <RouterView :top="top" :bottom="bottom" :hasScrollBar="hasScrollBar" />
          </main>
        </n-grid-item>
        <n-grid-item v-if="hasAside" :span="4">
          <aside class="sticky" :style="{ top: '44px' }">
            <MyAside />
          </aside>
          <!-- <aside class="h-full p-4 m-2">Aside</aside> -->
        </n-grid-item>
      </n-grid>
      <!-- <div class="border flex-1">content</div>
      <aside class="border">aside</aside> -->
    </main>
    <footer ref="footerRef" class="border sticky z-10" :style="{ bottom: 0, backgroundColor: '#FFF' }">
      <n-back-top class="z-10" :right="50" />
      Footer
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useElementSize, useScroll, useWindowSize } from "@vueuse/core";
const scrollBox = ref(null);
const headerRef = ref(null);
const mainBox = ref(null);
const footerRef = ref(null);
const { arrivedState } = useScroll(scrollBox);
const { top, bottom } = toRefs(arrivedState);

const wSize = useWindowSize()
const headerSize = useElementSize(headerRef)
const mainSize = useElementSize(mainBox)
const footerSize = useElementSize(footerRef)
// console.dir(wSize.height.value);
// console.dir(headerSize.height);
// console.dir(footerSize.height);
// console.dir(mainSize.height);

const hasScrollBar = computed(() => {
  // console.log('wh', wh);
  // console.log('hh', hh);
  // console.log('mh', mh);
  // console.log('fh', fh);
  const res = wSize.height.value < headerSize.height.value + mainSize.height.value + footerSize.height.value
  // console.log('res', res);

  return res
})
const hideAsideRoutes: string[] = ["archive", "tag", 'edit' ];

const route = useRoute();
const routeName = computed(() => route.name);
const hasAside = computed(() => checkAside(routeName.value as string));

const checkAside = (routeName: string) => {
  const find = hideAsideRoutes.find((e) => e === routeName);
  return !Boolean(find);
};

watch([hasScrollBar, mainSize.height], (newVal) => {
  // console.log('default hasScrollBar', newVal, oldVal);
  bottom.value = !newVal
},
  { immediate: true }
)


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
  z-index: 2;
  background-color: white;
}
</style>
