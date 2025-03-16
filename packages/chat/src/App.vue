<template>
  <Layout ref="layoutRef">
    <BubbleText :content="content" loading placement="start" />

    <BubbleText :content="content" typing placement="start" />

    <BubbleText :content="content" placement="start" :toolbar="['dislike']" />

    <BubbleText :content="content" placement="start" :toolbar="true" />

    <BubbleText :content="content" placement="start" />

    <BubbleText :content="content" placement="end" />

    <BubbleText :content="content" placement="end" />

    <BubbleText reason-content="江苏出台15条生育推动政策，①女职工生育津贴不用准备材料再" :content="content" placement="start" />
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BubbleText, Sender, SkillList, Layout } from '@miao/engine';

const layoutRef = ref<InstanceType<typeof Layout>>();

const content = ref(
  '江苏台夫妻档主持人苑逸伦和方蕾介绍起最新生育政策：江苏出台15条生育推动政策，①女职工生育津贴不用准备材料再申请，产妇产假结束后能自动到账；②按照南京市最低的社保缴费基数4879元来算，一胎顺产的生育津贴是25696元，还有一次性的营养费3193元，一共是28889元；③江苏失业女性生育可一次领3月失业金。'
);

onMounted(() => {
  console.log('App mounted');

  layoutRef.value?.setScrollBottom();
});
</script>

<style>
:root {
  --miao-primary-color-value: 37, 99, 235;
}
</style>
