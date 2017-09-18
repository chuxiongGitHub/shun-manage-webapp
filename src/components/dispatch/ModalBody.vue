<template lang="pug">
  Form(:label-width="72" :model="form")
    Spin(v-if="loading", fix)
    Form-item(label="商户名称")
      Input(placeholder="请输入商户名称" v-model="form.titile", @on-change="e => change('name', e.target.value)")
    Form-item(label="终端号")
      Input(placeholder="请输入终端号", v-model="form.machineCode", @on-change="e => change('machineCode', e.target.value)")
    Form-item(label="类型")
      Input(placeholder="请输入类型", v-model="form.type", @on-change="e => change('type', e.target.value)")
    Form-item(label="押金")
      Input(placeholder="请输入押金" v-model="form.money", @on-change="e => change('money', e.target.value)")
        Span(slot="append") 元
    Form-item(label="押金类型")
      Input(placeholder="请输入押金类型", v-model="form.monyeType", @on-change="e => change('moneyType', e.target.value)")
    Form-item(label="机具行")
      Input(placeholder="请输入机具行", v-model="form.machineTools", @on-change="e => change('machineTools', e.target.value)")
    Form-item(label="签约人")
      Input(placeholder="请输入签约人", v-model="form.signUser", @on-change="e => change('signUser', e.target.value)")
    Form-item(label="机具领用人")
      Input(placeholder="请输入机具领用人", v-model="form.useUser", @on-change="e => change('useUser', e.target.value)")
    Form-item(label="装机人")
      Input(placeholder="请输入装机人", v-model="form.installUser", @on-change="e => change('installUser', e.target.value)")
    Form-item(label="装机时间")
      Date-picker(
        v-model="form.time",
        @on-change="e => change('time', e)",
        type="datetime",
        :options="dateOptions",
        placeholder="选择装机时间"
        format="yyyy-MM-dd HH:mm",
        :clearable="false",
        :editable="false")
    Form-item(label="备注")
      Input(:value="form.remark", @on-change="value => change('remark', value.target.value)" :rows="5" type="textarea", placeholder="请输入备注内容")
</template>
<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    data () {
      return {
        _Autocomplete: null,
        queryLoading: false,
        queryResult: [],
        dateOptions: {
          disabledDate (date) {
            return moment(date).isBefore(moment().add(240, 'm'), 'day')
          }
        }
      }
    },
    computed: {
      ...mapState({
        form: ({ dispatch }) => dispatch.form,
        isEdit: ({ dispatch }) => dispatch.isEdit,
        loading: ({ dispatch }) => dispatch.loading.edit
      }),
      queryItems () {
        return _.chain(this.queryResult).map(item => item.name).value()
      }
    },
    methods: {
      change (key, value) {
        this.$store.commit('dispatch/form/change', { key, value })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>
