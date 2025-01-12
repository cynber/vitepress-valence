<template>
  <div class="number-cell">
    <span>{{ formattedValue }}</span>
  </div>
</template>

<script>
export default {
  name: "NumberCell",
  props: {
    value: {
      type: Number,
      required: true,
    },
    decimals: {
      type: Number,
      default: 2,
    },
    formatter: {
      type: Function,
      default: null,
    },
  },
  computed: {
    formattedValue() {
      if (this.formatter && typeof this.formatter === "function") {
        return this.formatter(this.value);
      }
      const hasFractionalPart = this.value % 1 !== 0;
      const fractionDigits = hasFractionalPart ? this.decimals : 0;
      return this.value.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });
    },
  },
};
</script>

<style scoped>
.number-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  width: 100%;
  height: 100%;
}

span {
  width: 100%;
}
</style>
