<template>
  <div class="patron-saint">
    <patron-saint-nav />
    <div class="patron-saint-page">
      <$KEBAB_PAGE_NAME$
        ref="page"
        v-if="logined"
        v-bind="pageOptions"
        v-on="pageListeners"
      />
    </div>
    <patron-saint-loginer
      v-if="!logined"
      ref="loginer"
      v-on="patronSaintLoginerListeners"
    />
    <patron-saint-toast 
      v-if="showPatronSaintToast"
      v-bind="patronSaintToastOptions"
    />
    <patron-saint-dialog
      v-if="showPatronSaintDialog"
      v-bind="patronSaintDialogOptions"
      v-on="patronSaintDialogListeners"
    />
  </div>
</template>

<script>
import $PAGE_NAME$ from './$PAGE_NAME$.vue'
import PatronSaintNav from '@/patronSaint/PatronSaintNav'
import PatronSaintLoginer from '@/patronSaint/PatronSaintLoginer'
import PatronSaintDialog from '@/patronSaint/PatronSaintDialog'
import PatronSaintToast from '@/patronSaint/PatronSaintToast'

import {
  EVENT_NAME_SHOW_TOAST,
  EVENT_NAME_SHOW_DIALOG,
  EVENT_NAME_DIALOG_OK_CLICK,
  EVENT_NAME_LOGIN_SUCCESS
} from '@/patronSaint/eventName'

export default {
  components: {
    $PAGE_NAME$,
    PatronSaintNav,
    PatronSaintLoginer,
    PatronSaintToast,
    PatronSaintDialog
  },
  data () {
    return {
      // page
      logined: false,
      pageListeners: {
        [EVENT_NAME_SHOW_TOAST]: (options) => {
          // toast的实现不是重点所以这里不做队列处理直接丢弃
          if (this.showPatronSaintToast) {
            return
          }
          this.patronSaintToastOptions = options
          this.showPatronSaintToast = true
          setTimeout(() => {
            this.showPatronSaintToast = false
          }, 800)
        },
        [EVENT_NAME_SHOW_DIALOG]: (options) => {
          this.patronSaintDialogOptions = options
          this.showPatronSaintDialog = true
        }
      },
      // loginer
      patronSaintLoginerListeners: {
        [EVENT_NAME_LOGIN_SUCCESS]: () => {
          this.logined = true
        }
      },
      // toast
      showPatronSaintToast: false,
      patronSaintToastOptions: {},
      // dialog
      showPatronSaintDialog: false,
      patronSaintDialogOptions: {},
      patronSaintDialogListeners: {
        [EVENT_NAME_DIALOG_OK_CLICK]: () => {
          this.showPatronSaintDialog = false
        }
      }
    }
  },
  computed: {
    // page
    pageOptions () {
      return {
        query: {
          // TODO:
        }
      }
    }
  },
  mounted () {
    // 参考issue: https://github.com/Meituan-Dianping/mpvue/issues/543
    // 因为二次进入时子组件的mounted方法不会被调用
    // 所以干脆自行实现子组件的mounted事件
    if (this.$refs.loginer.onMounted) {
      this.$refs.loginer.onMounted()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
