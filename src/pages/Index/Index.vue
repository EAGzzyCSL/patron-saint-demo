<template>
  <div class="index">
    <span>this is page index</span>
    <button
      @click="handleToMine"
    >to page Mine</button>
    <button
      @click="handleShowToast"
    >show toast</button>
    <button
      @click="handleShowDialog"
    >show Dialog</button>
  </div>
</template>

<script>
import PatronSaintFactory from '@/patronSaint/PatronSaintFactory'

export default PatronSaintFactory({
  methods: {
    onShareAppMessage () {
      return {
        title: 'custom share title'
      }
    },
    handleToMine () {
      wx.navigateTo({
        url: '/pages/Mine/Mine'
      })
    },
    handleShowToast () {
      this.$ps.showToast({
        title: 'this is a toast'
      })
    },
    handleShowDialog () {
      this.$ps.showDialog({
        title: 'PatronSaint Dialog',
        content: 'this is a dialog'
      })
    }
  }
})
</script>

<style scoped>

</style>
