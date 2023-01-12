<template>
  <div>
    Welcome Content <br>
    <!-- bottom: {{ props.isBottom }} <br> -->
    <!-- top: {{ props.top }} <br> -->
    <span v-if="top">
      已经到顶了哦！
    </span> <br>
    top: {{ top }} <br>
    <p v-for="v in indexs" :key="v">{{ v }}</p>
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

const indexs = ref(50)

watch(() => props.bottom, async (newVal, oldVal) => {
  console.log('new val: ' , newVal);
  console.log('old val: ' , oldVal);
  if (newVal == true) {
    const res: number = await new Promise((resolve, reject) => resolve(30))
    console.log('res', res);
    indexs.value += res;
  }
})

</script>

<style lang="scss" scoped></style>
