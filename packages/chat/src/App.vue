<template>
  <div>
    <BubbleText :content="content" placement="start" :avatar="{ title: '妙手 AI UI' }" />

    <Sender />

    <SkillButton> 帮我写作 </SkillButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BubbleText, Sender, SkillButton } from '@miao/engine';

const content = ref(
  '江苏台夫妻档主持人苑逸伦和方蕾介绍起最新生育政策：江苏出台15条生育推动政策，①女职工生育津贴不用准备材料再申请，产妇产假结束后能自动到账；②按照南京市最低的社保缴费基数4879元来算，一胎顺产的生育津贴是25696元，还有一次性的营养费3193元，一共是28889元；③江苏失业女性生育可一次领3月失业金。'
);
</script>

<style scoped></style>
