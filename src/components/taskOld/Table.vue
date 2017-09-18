<template lang="pug">
  Table(:columns="columns")
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '商户名称',
          key: 'title'
        },
        {
          title: '商户编号',
          key: 'content'
        },
        {
          title: '终端号',
          key: 'expire'
        },
        {
          title: '问题描述',
          key: 'user'
        },
        {
          title: '机型',
          key: 'user'
        },
        {
          title: '地址',
          key: 'mobile'
        },
        {
          title: '联系电话',
          key: 'status'
        },
        {
          title: '联系人',
          key: ''
        },
        {
          title: '维护负责人',
          key: ''
        },
        {
          title: '完成情况'

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

