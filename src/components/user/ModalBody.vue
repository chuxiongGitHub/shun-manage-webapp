<template lang="pug">
  Form(:label-width="72")
    Spin(v-if="loading", fix)
    Form-item(label="用户电话")
      Input(:value="form.mobile", @on-change="e => change('mobile', e.target.value)", :disabled="isEdit")
    Form-item(label="用户姓名")
      Input(:value="form.username", @on-change="e => change('username', e.target.value)")
    Form-item(label="所属单位")
      Input(:value="form.company")
</template>
<script>
  import { mapState } from 'vuex'
  import { FORM_CHANGE } from 'store/user/keys'
  export default {
    computed: {
      ...mapState({
        form: ({ user }) => user.form,
        isEdit: ({ user }) => user.isEdit,
        loading: ({ user }) => user.loading.edit
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
