<template lang="pug">
  .device-page
    Page(
      show-sizer,
      show-total,
      :total="total",
      :current="page",
      :page-size="size",
      placement="top",
      @on-change="page => queryChange('page', page)"
      @on-page-size-change="size => queryChange('size', size)")
</template>
<script>
import { mapState } from 'vuex'
import { QUERY_CHANGE } from 'store/device/keys'
export default {
  computed: {
    ...mapState({
      page: ({device}) => device.query.page,
      size: ({device}) => device.query.size,
      total: ({device}) => device.total
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>

<style lang="stylus">
@import  './style/device'
</style>

