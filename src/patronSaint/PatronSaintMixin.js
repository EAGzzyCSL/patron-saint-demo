import {
  EVENT_NAME_SHOW_TOAST,
  EVENT_NAME_SHOW_DIALOG
} from '@/patronSaint/eventName'

export default {
  props: {
    query: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    $ps () {
      return {
        showToast: (options) => {
          this.$emit(EVENT_NAME_SHOW_TOAST, options)
        },
        showDialog: (options) => {
          this.$emit(EVENT_NAME_SHOW_DIALOG, options)
        }
      }
    }
  }
}
