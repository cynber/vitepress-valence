<template>
  <Icon
    :icon="value ? 'akar-icons:circle-check-fill' : 'akar-icons:circle-x-fill'"
    :style="{ color: value ? 'var(--vp-c-green-3)' : 'var(--vp-c-red-3)' }"
    class="icon"
  />
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "BooleanCell",
  components: { Icon },
  props: {
    value: Boolean,
  },
};
</script>

<style scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
