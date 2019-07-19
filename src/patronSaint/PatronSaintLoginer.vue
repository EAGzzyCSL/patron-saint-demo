<template>
  <div class="patron-saint-loginer">
    <span
      v-if="showLoading"
      class="loading"
    >登录中……</span>
    <button
      v-if="fail"
      class="button-retry"
      @click="handleRetry"
    >登录失败请重试</button>
  </div>
</template>
<script>
import {
  EVENT_NAME_LOGIN_SUCCESS
} from '@/patronSaint/eventName'

export default {
  data () {
    return {
      fail: false,
      showLoading: true
    }
  },
  methods: {
    onMounted () {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        if (Math.random() > 0.5) {
          this.fail = true
        } else {
          this.$emit(EVENT_NAME_LOGIN_SUCCESS)
        }
      }, 500)
    },
    handleRetry () {
      this.$emit(EVENT_NAME_LOGIN_SUCCESS)
    }
  }
}
</script>
<style lang="scss" scoped>
.patron-saint-loginer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading {
    width: 10em;
    height: 2em;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
