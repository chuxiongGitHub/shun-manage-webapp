<template lang="pug">
  .taskOld-page
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
import { QUERY_CHANGE } from 'store/taskOld/keys'
export default {
  computed: {
    ...mapState({
      page: ({taskOld}) => taskOld.query.page,
      size: ({taskOld}) => taskOld.query.size,
      total: ({taskOld}) => taskOld.total
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>

