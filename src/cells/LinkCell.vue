<template>
  <a :href="value" target="_blank">
    {{ value }}
  </a>
</template>

<script>
export default {
  name: "LinkCell",
  props: {
    value: String,
  },
};
</script>

<style scoped>
a {
  color: var(--vp-c-brand);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
