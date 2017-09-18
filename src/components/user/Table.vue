<template lang="pug">
  .user
    Table(:columns="columns" :data="users")
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '用户姓名',
          key: 'username'
        },
        {
          title: '手机号码',
          key: 'mobile'
        },
        {
          title: '用户状态',
          align: 'center',
          filters: [
            { label: '正常', value: 1 },
            { label: '停用', value: 0 }
          ],
          filterRemote: value => this.$store.dispatch('user/query/change', { key: 'status', value: value.join(',') }),
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
          title: '用户类型',
          align: 'center',
          filters: [
            { label: '管理员', value: 1 },
            { label: 'APP用户', value: 2 },
            { label: '第三方用户', value: 3 }
          ],
          filterRemote: value => this.$store.dispatch('user/query/change', { key: 'typs', value: value.join(',') }),
          render: (h, { row }) => {
            switch (row.type) {
              case 1:
                return <span style="color:#19be6b">管理员</span>
              case 2:
                return <span style="color:#5cadff">App用户</span>
              case 3:
                return <span style="color:#1c2438">第三方用户</span>
            }
          }
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '登录次数',
          key: 'loginNum'
        },
        {
          title: '最后一次登陆时间',
          key: 'lastTime'
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
              <i-button size="small" type="primary" onClick={() => this.edit(row.mobile)}>编辑</i-button>
            </div>
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      users: ({user}) => user.list
    })
  },
  created () {
    this.$store.dispatch('user/list')
  },
  methods: {
    edit (mobile) {
      this.$store.dispatch('user/edit', mobile)
    },
    changeStatus (row) {
      this.$store.dispatch('user/modify', { mobile: row.mobile, data: { status: row.status === 0 ? 1 : 0 } })
    }
  }
}
</script>

