<template>
  <div :class="name">
    <Skill v-for="item in items" :key="item.text" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils';
import Skill from './Skill.vue';
import { SkillListProps } from './interface';

withDefaults(defineProps<SkillListProps>(), { items: () => [] });

const [name] = createNamespace('skill-list');
</script>

<style lang="less">
.m-skill-list {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: auto;
  gap: 10px;
}
</style>
