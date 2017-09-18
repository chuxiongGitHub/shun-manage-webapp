<template lang="pug">
.search
  Row(type="flex")
    Col(:span="10")
      Form(:label-width="80" :model="query")
        Form-item(label="综合查询：")
          Input(placeholder="请输入编码、创建人", v-model="query.searchKey" @on-enter="search", icon="ios-search-strong")
    Col(:span="14")
      Form(:label-width="120")
        Form-item(style="text-align:right")
          Button(type="info" @click="search") 查询
          Button(type="primary" @click="open" style="margin-left:8px") 添加设备
          Button(type="info" @click="fresh" style="margin-left:8px") 刷新
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      query: ({device}) => device.query
    })
  },
  methods: {
    search () {
      this.$store.dispatch('device/query/change', { key: 'searchKey', value: this.query.searchKey })
    },
    open () {
      this.$store.commit('device/modal', { name: 'form', show: true })
    },
    fresh () {
      this.query.searchKey = ''
      this.query.page = 1
      this.$store.dispatch('device/list')
    }
  }
}
</script>
