<template lang="pug">
  Form(:label-width="72" :model="form")
    Spin(v-if="loading", fix)
    Form-item(label="任务标题")
      Input(:value="form.titile", @on-change="value => change('title', value)")
    Form-item(label="任务位置")
      Select(
        :value="form.point.name"
        placeholder="请输入",
        filterable,
        remote,
        :remote-method="lazyQuery",
        :loading="queryLoading",
        @on-change="value => change('name', value)",
        clearable)
        Option(v-for="item in queryItems", :value="item", :key="item")
    Form-item(label="过期时间")
      Date-picker(
        :value="form.expire",
        @on-change="value => change('expire', value)",
        type="datetime",
        :options="dateOptions",
        format="yyyy-MM-dd HH:mm",
        :clearable="false",
        :editable="false")
    Form-item(label="任务内容")
      Input(:value="form.content", @on-change="value => change('content', value)" :rows="5" type="textarea")
</template>
<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'
  const loadScript = (key = '4d014a4800e8f9fc8ef524a94db2588a') => new Promise((resolve, reject) => {
    const callback = `CALLBACK_${Date.now()}`
    window[callback] = () => resolve(window.AMap)
    const script = document.createElement('script')
    script.src = `//webapi.amap.com/maps?v=1.3&key=${key}&callback=${callback}`
    document.body.appendChild(script)
  })

  const loadMod = (AMap, type, name, options = {}) => new Promise((resolve, reject) => {
    const callback = () => resolve(new AMap[name](options))
    type ? AMap[type]('AMap.' + name, callback) : callback()
  })

  const exec = function (method, ...args) {
    return new Promise((resolve, reject) => method.apply(this, [...args, (status, result) => {
      if (_.isObject(status)) return reject(status)
      if (status === null) return resolve(result)
      switch (status) {
        case 'complete':
          resolve(result)
          break
        case 'no_data':
          reject(new Error('没有数据'))
          break
        case 'error':
          reject(new Error('未知错误'))
      }
    }]))
  }
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
        const item = (_.chain(this.queryResult).filter(item => item.name === value).value() || [])[0]
        const boarding = item ? { lng: item.location.lng, lat: item.location.lat } : null
        value = { name: value, boarding }
        this.queryResult = []
        this.$store.commit('dispatch/form/change', { key, value })
      },
      lazyQuery: _.debounce(function (keyword) { this.query(keyword) }, 300),
      async query (keyword) {
        if (!_.trim(keyword)) {
          this.queryResult = []
          return
        }
        this.queryLoading = true
        console.log('正在地图搜索')
        const { _Autocomplete } = this
        try {
          const result = await exec.call(_Autocomplete, _Autocomplete.search, keyword)
          this.queryResult = _.chain(result.tips).filter(item => item.location).value()
        } catch (error) {
          this.queryResult = []
        } finally {
          this.queryLoading = false
        }
      }
    },
    async beforeMount () {
      const AMap = await loadScript()
      this._Autocomplete = await loadMod(AMap, 'plugin', 'Autocomplete', { city: '昆明' })
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>
