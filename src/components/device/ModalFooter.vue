<template lang="pug">
  .footer
    Button(@click="close", :disable="loading") 取消
    Button(@click="sure", type="primary", :loading="loading") {{ sureName }}
</template>
<script>
import { mapState } from 'vuex'
import { MODAL, CREATE, SAVE } from 'store/device/keys'
export default {
  computed: {
    ...mapState({
      loading: ({ device }) => device.loading.create,
      isEdit: ({ device }) => device.isEdit
    }),
    sureName () {
      return this.isEdit ? '修改' : '创建'
    }
  },
  methods: {
    close () {
      this.$store.commit(MODAL, { name: 'form', show: false })
    },
    sure () {
      if (this.isEdit) {
        this.$store.dispatch(SAVE)
      } else {
        this.$store.dispatch(CREATE)
      }
    }
  }
}
</script>
