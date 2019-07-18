<template>
  <div class="index">
    <span>this is page index</span>
    <button
      @click="handleToMine"
    >to page Mine</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleToMine () {
      wx.navigateTo({
        url: '/pages/Mine/Mine'
      })
    }
  }
}
</script>

<style scoped>

</style>
