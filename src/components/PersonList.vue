<template>
  <ul class="person-list">
    <slot />
  </ul>
</template>

<script setup></script>

<style scoped lang="scss">
.person-list {
  display: flex;
  width: 60%;
  max-width: 60%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  gap: 40px;
  overflow-x: auto;
}
</style>
