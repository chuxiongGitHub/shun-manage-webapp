<template lang="pug">
  Table(:columns="columns" :data="list")
</template>

<script>
import { mapState } from 'vuex'
import AppTableExpand from './TableExpand'
export default {
  components: { AppTableExpand },
  computed: {
    ...mapState({
      list: ({ company }) => company.list
    }),
    columns () {
      const columns = [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            const test = params.row.machine
            console.log('ggg', test)
            const array = Array.from(test)
            console.log('hhh', array)
            return h(AppTableExpand, {
              props: {
                row: Array.from(params.row.machine)
              }
            })
          }
        },
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '商户名称',
          key: 'name',
          width: '160px'
        },
        {
          title: '商户编码',
          key: 'code'
        },
        {
          title: '商户地址',
          render: (h, { row }) => {
            const { address } = row
            return <span>{ address.name }</span>
          }
        },
        {
          title: '联系人',
          key: 'username'
        },
        {
          title: '联系电话',
          key: 'mobile'
        },
        {
          title: '状态',
          render: (h, { row }) => {
            switch (row.status) {
              case 1:
                return <span style="color:#009688">正常</span>
              case 0:
                return <span style="color:#ed3f14">停用</span>
            }
          }
        },
        {
          title: '创建人',
          render: (h, { row }) => {
            const { user } = row
            return <span>{user.username}</span>
          }
        },
        {
          title: '设备编码',
          key: 'machineCode'
        },
        {
          title: '操作',
          render: (h, { row }) => {
            return <div>
              <span><i-button type="ghost" size="small">编辑</i-button></span>
              <span style="margin-left:8px"><i-button type="primary" size="small">编辑</i-button></span>
            </div>
          }
        }
      ]
      return columns
    }
  },
  created () {
    this.$store.dispatch('company/list')
  }
}
</script>

