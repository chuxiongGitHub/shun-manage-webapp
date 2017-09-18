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
          title: '任务名称',
          key: 'title'
        },
        {
          title: '任务内容',
          key: 'content'
        },
        {
          title: '任务过期时间',
          key: 'expire'
        },
        {
          title: '任务创建人',
          key: 'user'
        },
        {
          title: '任务负责人',
          key: 'user'
        },
        {
          title: '负责人电话',
          key: 'mobile'
        },
        {
          title: '任务状态',
          key: 'status'
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

