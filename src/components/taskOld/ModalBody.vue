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
    Form-item(label="维护人")
      Select(
        v-model="form.serverUser",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入维护人",
        @on-change="e => change('serverUser', e)")
          Option(v-for="user in userQuery", :value="user.username", :key="user.username") {{user.username}}
    Form-item(label="装机时间")
      Date-picker(
        v-model="form.time",
        @on-change="e => change('time', e)",
        type="datetime",
        :options="dateOptions",
        placement="top",
        placeholder="请选择维护时间"
        format="yyyy-MM-dd HH:mm",
        :clearable="false",
        :editable="false")
    Form-item(label="问题描述")
      Input(:value="form.question", @on-change="value => change('question', value.target.value)" :rows="5" type="textarea", placeholder="请输入问题描述")
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
        form: ({ taskOld }) => taskOld.form,
        isEdit: ({ taskOld }) => taskOld.isEdit,
        loading: ({ taskOld }) => taskOld.loading.edit,
        companyQuery: ({company}) => company.queryResult,
        deviceQuery: ({device}) => device.queryResult,
        userQuery: ({user}) => user.queryResult
      })
    },
    methods: {
      change (key, value) {
        this.$store.commit('taskOld/form/change', { key, value })
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
