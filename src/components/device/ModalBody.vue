<template lang="pug">
  Form(:label-width="80")
    Spin(v-if="loading" flex)
    Form-item(label="设备名称")
      Input(placeholder="请输入设备名称" v-model="form.name" @on-change="e => change('name', e.target.value)")
    Form-item(label="设备编码")
      Input(placeholder="请输入设备编码", v-model="form.machineCode", @on-change="e => change('machineCode', e.target.value)", :disabled="isEdit")
    Form-item(label="设备型号")
      Input(v-model="form.machineType", @on-change="e => change('machineType', e.target.value)", placeholder="请输入设备型号")
    Form-item(label="备注信息")
      Input(v-model="form.remark", type="textarea", @on-change="e => change('remark', e.target.value)", :rows="2", placeholder="请输入备注信息")
</template>
<script>
  import { mapState } from 'vuex'
  import { FORM_CHANGE } from 'store/device/keys'
  export default {
    computed: {
      ...mapState({
        form: ({ device }) => device.form,
        isEdit: ({ device }) => device.isEdit,
        loading: ({ device }) => device.loading.edit
      })
    },
    methods: {
      change (key, value) {
        this.$store.commit(FORM_CHANGE, { key, value })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>