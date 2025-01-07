<template>
  <span>{{ value }}</span>
</template>

<script>
export default {
  name: "TextCell",
  props: {
    value: [String, Number, null],
  },
};
</script>
