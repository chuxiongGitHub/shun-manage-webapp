<template lang="pug">
  Table(:columns="columns" :data="list")
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      list: ({taskOld}) => taskOld.list
    })
  },
  created () {
    this.$store.dispatch('taskOld/list')
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '商户名称',
          align: 'center',
          width: '150',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.name}</span>
          }
        },
        {
          title: '终端号',
          align: 'center',
          render: (h, { row }) => {
            const machine = row.machine
            return <span>{machine.machineCode}</span>
          }
        },
        {
          title: '问题描述',
          width: '170',
          key: 'question'
        },
        {
          title: '机型',
          align: 'center',
          render: (h, { row }) => {
            const machine = row.machine
            return <span>{machine.machineType}</span>
          }
        },
        {
          title: '地址',
          align: 'center',
          width: '170',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.address.name}</span>
          }
        },
        {
          title: '联系电话',
          align: 'center',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.mobile}</span>
          }
        },
        {
          title: '联系人',
          align: 'center',
          render: (h, { row }) => {
            const company = row.company
            return <span>{company.username}</span>
          }
        },
        {
          title: '维护负责人',
          align: 'center',
          render: (h, { row }) => {
            const user = row.serverUser
            return <span>{user.username}</span>
          }
        },
        {
          title: '创建人',
          align: 'center',
          render: (h, { row }) => {
            const user = row.user
            return <span>{user.username}</span>
          }
        },
        {
          title: '完成情况',
          align: 'center',
          filters: [
            { label: '未派发', value: 0 },
            { label: '已派发', value: 1 },
            { label: '进行中', value: 2 },
            { label: '已完成', value: 3 },
            { label: '未完成', value: 4 }
          ],
          filterRemote: value => this.$store.dispatch('taskOld/query/change', { key: 'status', value: value.join(',') }),
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
          title: '操作',
          render: (h, { row }) => {
            return <i-button typs="info" size="small">派任务</i-button>
          }
        }
      ]
    }
  }
}
</script>

