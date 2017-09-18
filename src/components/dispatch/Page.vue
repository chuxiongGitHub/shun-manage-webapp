<template lang="pug">
  .dispatch-page
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
import { QUERY_CHANGE } from 'store/dispatch/keys'
export default {
  computed: {
    ...mapState({
      page: ({dispatch}) => dispatch.query.page,
      size: ({dispatch}) => dispatch.query.size,
      total: ({dispatch}) => dispatch.total
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>

