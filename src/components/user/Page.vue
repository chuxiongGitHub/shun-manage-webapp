<template lang="pug">
  .user-page
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
import { QUERY_CHANGE } from 'store/user/keys'
export default {
  computed: {
    ...mapState({
      page: ({user}) => user.query.page,
      size: ({user}) => user.query.size,
      total: ({user}) => user.total
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>
