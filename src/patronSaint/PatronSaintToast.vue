<template>
  <div class="patron-saint-toast">
    <span class="title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.patron-saint-toast {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 10em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
}
</style>
