<template>
  <div class="aside">
    <!-- search -->
    <n-input-group>
      <n-input v-model:value="keyword" @keyup="handleKeyUp" maxlength="20" placeholder="请输入关键字进行搜索" show-count
        clearable />
      <n-button type="primary" ghost @click="handleClickSearch">搜索</n-button>
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

const keyword = ref('')
const router = useRouter();
const handleClickSearch = () => {
  router.replace({ name: "index", query: { key: keyword.value } })
}

const handleKeyUp = (e) => {
  if (e.key === 'Enter') {
    handleClickSearch()
  }
}

</script>

<style lang="scss" scoped></style>
