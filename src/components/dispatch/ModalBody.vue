<template lang="pug">
  Form(:label-width="72" :model="form")
    Spin(v-if="loading", fix)
    Form-item(label="商户名称")
      Select(
        v-model="form.name",
        filterable,
        remote,
        :remote-method="remoteQueryCompany",
        :loading="loading", placeholder="请输商户名称",
        @on-change="e => change('name', e)")
          Option(v-for="company in companyQuery", :value="company.name", :key="company.name") {{company.name}}
    Form-item(label="终端号")
      Select(
        v-model="form.machineCode",
        filterable,
        remote,
        :remote-method="remoteQueryDevice",
        :loading="loading",
        placeholder="请输入终端号",
        @on-change="e => change('machineCode', e)")
          Option(v-for="machine in deviceQuery", :value="machine.machineCode", :key="machine.machineCode") {{machine.machineCode}}
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
      Select(
        v-model="form.signUser",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入签约人",
        @on-change="e => change('signUser', e)")
          Option(v-for="user in userQuery", :value="user.username", :key="user.username") {{user.username}}
    Form-item(label="机具领用人")
      Select(
        v-model="form.useUser",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入机具领用人",
        @on-change="e => change('useUser', e)")
          Option(v-for="user in userQuery", :value="user.username", :key="user.username") {{user.username}}
    Form-item(label="装机人")
      Select(
        v-model="form.installUser",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入机具领用人",
        @on-change="e => change('installUser', e)")
          Option(v-for="user in userQuery", :value="user.username", :key="user.username") {{user.username}}
    Form-item(label="装机时间")
      Date-picker(
        v-model="form.time",
        @on-change="e => change('time', e)",
        type="datetime",
        :options="dateOptions",
        placement="top",
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
  import { COMPANY_RESULT } from 'store/company/keys'
  import { DEVICE_RESULT } from 'store/device/keys'
  import { USER_RESULT } from 'store/user/keys'
  export default {
    data () {
      return {
        _Autocomplete: null,
        queryLoading: false,
        companyResult: [],
        deviceResult: [],
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
        loading: ({ dispatch }) => dispatch.loading.edit,
        companyQuery: ({company}) => company.queryResult,
        deviceQuery: ({device}) => device.queryResult,
        userQuery: ({user}) => user.queryResult
      })
    },
    methods: {
      change (key, value) {
        this.$store.commit('dispatch/form/change', { key, value })
      },
      // 商户搜索
      remoteQueryCompany: _.debounce(function (keyword) { this.query(keyword) }, 300),
      async query (keyword) {
        this.$store.dispatch(COMPANY_RESULT, keyword)
      },
      // 设备搜索
      remoteQueryDevice: _.debounce(function (keyword) { this.queryDevice(keyword) }, 300),
      async queryDevice (keyword) {
        this.$store.dispatch(DEVICE_RESULT, keyword)
      },
      // 用户搜索
      remoteQueryUser: _.debounce(function (keyword) { this.queryUser(keyword) }, 300),
      async queryUser (keyword) {
        this.$store.dispatch(USER_RESULT, keyword)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>
