<template lang="pug">
  .company-page
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
import { QUERY_CHANGE } from 'store/company/keys'
export default {
  computed: {
    ...mapState({
      page: ({company}) => company.query.page,
      size: ({company}) => company.query.size,
      total: ({company}) => company.total
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>
