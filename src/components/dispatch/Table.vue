<template lang="pug">
  Table(:columns="columns" :data="list")
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      list: ({dispatch}) => dispatch.list
    })
  },
  created () {
    this.$store.dispatch('dispatch/list')
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: '60'
        },
        {
          title: '商户名称',
          width: '160',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.name}</span>
          }
        },
        {
          title: '商户编号',
          width: '85',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.code}</span>
          }
        },
        {
          title: '终端号',
          width: '80',
          render: (h, { row }) => {
            const machine = row.machine
            return <span>{machine.machineCode}</span>
          }
        },
        {
          title: '商户地址',
          width: '170',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.address.name}</span>
          }
        },
        {
          title: '联系人',
          width: '90',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.username}</span>
          }
        },
        {
          title: '联系电话',
          width: '110',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.mobile}</span>
          }
        },
        {
          title: '类型',
          width: '60',
          key: 'type'
        },
        {
          title: '押金',
          width: '60',
          key: 'money'
        },
        {
          title: '押金类型',
          width: '85',
          key: 'moneyType'
        },
        {
          title: '机具行',
          width: '100',
          key: 'machineTools'
        },
        {
          title: '签约人',
          width: '90',
          render: (h, { row }) => {
            const signUser = row.signUser
            return <span>{signUser.username}</span>
          }
        },
        {
          title: '机具领用人',
          width: '100',
          render: (h, { row }) => {
            const useUser = row.useUser
            return <span>{useUser.username}</span>
          }
        },
        {
          title: '装机人',
          width: '90',
          render: (h, { row }) => {
            const installUser = row.installUser
            return <span>{installUser.username}</span>
          }
        },
        {
          title: '装机时间',
          width: '135',
          key: 'time'
        },
        {
          title: '工单状态',
          width: '130',
          render: (h, { row }) => {
            var color = ''
            var text = ''
            if (row.status === 0) {
              color = 'yellow'
              text = '未派发'
            }
            if (row.status === 1) {
              color = 'grey'
              text = '已派发'
            }
            if (row.status === 2) {
              color = 'blue'
              text = '进行中'
            }
            if (row.status === 3) {
              color = 'green'
              text = '已完成'
            }
            if (row.status === -1) {
              color = 'red'
              text = '未完成'
            }
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '备注',
          width: '160',
          key: 'remark'
        },
        {
          title: '操作',
          render: (h, { row }) => {
            return <i-button type="primary" size="small">编辑</i-button>
          }
        }
      ]
    }
  }
}
</script>

