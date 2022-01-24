<template>
  <div v-if="address">
    <span class="led-green"></span>
    <span class="mono">{{ address }}</span>
  </div>
</template>

<script>
export default {
  props: ["address"],
};
</script>

<style>
.led-green {
  position: relative;
  display: inline-block;
  top: 0px;
  margin-right: 0.5em;
  background-color: var(--primary);
  width: 14px;
  height: 14px;
  border-radius: 14px;
}
</style>