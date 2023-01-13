<template>
  <div>
    Welcome Content <br />
    <!-- bottom: {{ props.isBottom }} <br> -->
    <!-- top: {{ props.top }} <br> -->
    <span v-if="top"> 已经到顶了哦！ </span> <br />
    top: {{ top }} <br />
    <!-- <p v-for="v in indexs" :key="v">{{ v }}</p> -->
    <!-- <pre>{{ articles }}</pre> -->
    <div class="article" v-for="v in articles" :key="v.id">
      <n-icon class="top" v-if="v.top" :component="TopIcon" />
      <h2 class="text-rose-600">
        <router-link :to="`/article/${v.id}`">{{ v.title }}</router-link>
      </h2>
      <n-space class="tags">
        <n-tag>
          <n-icon :component="CalendarIcon" />
          &nbsp;{{ v.createdAt }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="TagsIcon" />
          花譜、神椿
          <!-- <i v-for="t in v.tags" :key="t.tag?.id">
                                            &nbsp;<router-link :to="`/post/tag/${t.tag?.id}`">{{
                                                    t.tag?.tagName
                                            }}</router-link>&nbsp;
                                        </i> -->
        </n-tag>
        <n-tag>
          <n-icon :component="EyeIcon" />
          &nbsp;{{ v.viewCount }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="LikeIcon" />
          &nbsp;{{ v.likeCount }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="CommentsIcon" />
          &nbsp;{{ v.commentCount }}&nbsp;
        </n-tag>
      </n-space>
      <div class="content">
        <router-link :to="`/post/${v.id}`">
          <div class="img">
            <img :src="`/src/assets/img/article/${v.coverImage}`" alt="" />
            <div class="description">
              {{ v.description }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
    bottom: {{ bottom }} <br />

    <span v-if="bottom"> 已经到底了哦！ </span> <br />
  </div>
</template>

<script setup lang="ts">
import {
  Fire as FireIcon,
  Bookmark as TopIcon,
  CalendarAltRegular as CalendarIcon,
  Tags as TagsIcon,
  EyeRegular as EyeIcon,
  ThumbsUpRegular as LikeIcon,
  CommentsRegular as CommentsIcon,
} from "@vicons/fa";
import { useArticleStore } from "@/store";
import { useFetch } from "@vueuse/core";

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
});

const indexs = ref(50);



const email = ref("lixunsam");
const { data } = useFetch(`/api/user/code?email=${email.value}`).get().text();
console.log("res", data);

const page = reactive({
  pageNum: 1,
  pageSize: 10
})

const articleStore = useArticleStore();
articleStore.fetchPageArticles(page);
const { getArticles: articles } = toRefs(articleStore);

watch(
  () => props.bottom,
  async (newVal, oldVal) => {
    console.log("new val: ", newVal);
    console.log("old val: ", oldVal);
    if (newVal == true) {
      const res: number = await new Promise((resolve, reject) => resolve(30));
      console.log("res", res);
      indexs.value += res;
      page.pageNum += 1
      articleStore.fetchPageArticles(page)
    }
  }
);

</script>

<style lang="scss" scoped></style>
