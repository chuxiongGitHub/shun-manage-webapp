<template lang="pug">
  Form(:label-width="72")
    Spin(v-if="loading", fix)
    Form-item(label="公告标题")
      Input(:value="form.titile", @on-change="e => change('title', e.target.value)")
    Form-item(label="公告类型")
      Input(:value="form.type", @on-change="e => change('type', e.target.value)")
    Form-item(label="公告内容")
      Input(:value="form.content", @on-change="e => change('content', e.target.value)" :rows="5" type="textarea")
</template>
<script>
  import { mapState } from 'vuex'
  import { FORM_CHANGE } from 'store/note/keys'
  export default {
    computed: {
      ...mapState({
        form: ({ note }) => note.form,
        isEdit: ({ note }) => note.isEdit,
        loading: ({ note }) => note.loading.edit
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
