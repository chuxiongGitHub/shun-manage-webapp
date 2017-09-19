<template lang="pug">
.table
  Table(:columns="columns" :data="list")
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      list: ({device}) => device.list
    })
  },
  created () {
    this.$store.dispatch('device/list')
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '设备名称',
          key: 'name'
        },
        {
          title: '设备编码',
          key: 'machineCode'
        },
        {
          title: '设备型号',
          key: 'machineType'
        },
        {
          title: '设备状态',
          align: 'center',
          filters: [
            { label: '正常', value: 1 },
            { label: '停用', value: 0 }
          ],
          filterRemote: value => this.$store.dispatch('device/query/change', { key: 'status', value: value.join(',') }),
          render: (h, { row }) => {
            const color = row.status === 1 ? 'green' : 'red'
            const text = row.status === 1 ? '正常' : '禁用'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '创建人',
          align: 'center',
          render: (h, { row }) => {
            return <span>{ row.user.username }</span>
          }
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '备注信息',
          key: 'remark'
        },
        {
          title: '操作',
          align: 'center',
          render: (h, { row }) => {
            const temp = {
              0: '启用',
              1: '禁用'
            }[row.status]
            return <div style="margin: 4px 0">
              <i-button size="small" type="info" onClick={() => this.changeStatus(row)} style="margin-right: 10px">{temp}</i-button>
              <i-button size="small" type="primary" onClick={() => this.edit(row.machineCode)}>编辑</i-button>
            </div>
          }
        }
      ]
    }
  },
  methods: {
    changeStatus (row) {
      this.$store.dispatch('device/modify', { mobile: row.machineCode, data: { status: row.status === 0 ? 1 : 0 } })
    },
    edit (machineCode) {
      this.$store.dispatch('device/edit', machineCode)
    }
  }
}
</script>

