<template>
  <div class="patron-saint-dialog">
    <div class="title">{{ title }}</div>
    <div class="content">{{ content }}</div>
    <div
      class="ok"
      @click="handleOkButtonClick"
    >ok</div>
  </div>
</template>
<script>
import {
  EVENT_NAME_DIALOG_OK_CLICK
} from '@/patronSaint/eventName'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleOkButtonClick () {
      this.$emit(EVENT_NAME_DIALOG_OK_CLICK)
    }
  }
}
</script>
<style lang="scss" scoped>
.patron-saint-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 16em;
  height: 16em;
  background-color: lightgray;
  display: flex;
  flex-direction: column;

  .title {
    flex: 0 0 2em;
  }
  .content {
    flex: 1 0 0;
  }
  .ok {
    flex: 0 0 2em;
  }

  .title,
  .content,
  .ok {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
