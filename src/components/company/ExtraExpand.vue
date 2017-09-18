<template lang="pug">
  .extra
    .content
      Row
        span(style="margin:45%;font-size:15px") 设备信息
        Table(:columns="columns" :data="machine" size="small" highlight-row)
</template>
<script>
export default {
  data () {
    console.log('machine', this.machine)
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
          title: '设备编号',
          key: 'machineCode'
        },
        {
          title: '设备创建人',
          key: ''
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '备注信息',
          key: 'remark'
        }
      ]
    }
  },
  props: ['machine']
}
</script>

<style lang="stylus" scoped>
@import './style/expand'
</style>
