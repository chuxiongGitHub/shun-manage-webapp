<template lang="pug">
.toolbar
  Row(type="flex")
    Col(:span="10")
      Form(:label-width="100" :model="query")
        Form-item(label="综合查询")
          Input(placeholder="请输入查询" icon="ios-search-strong" v-model="query.searchKey" @on-enter="search")
    Col(:span="14")
      Form(:label-width="120")
        Form-item(style="text-align:right")
          Button(type="info" @click="search") 查询
          Button(type="primary" @click="open" style="margin-left:8px") 创建商户
          Button(type="ghost" @click="refresh" style="margin-left:8px") 刷新
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchKey: ''
    }
  },
  computed: {
    ...mapState({
      query: ({ company }) => company.query
    })
  },
  methods: {
    search () {
      this.$store.dispatch('company/query/change', { key: this.searchKey, value: this.searchKey })
    },
    open () {
      this.$store.commit('company/modal', { name: 'form', show: true })
    },
    refresh () {
      this.query.page = 1
      this.query.searchKey = ''
      this.$store.dispatch('company/list')
    }
  }
}
</script>

