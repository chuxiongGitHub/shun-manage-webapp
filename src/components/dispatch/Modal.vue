<template lang="pug">
  Modal(
    :value="show",
    :title="title",
    :closable="false",
    :mask-closable="false",
    :styles="style")
    AppModalBody
    AppModalFooter(slot="footer")
</template>

<script>
  import AppModalBody from './ModalBody'
  import AppModalFooter from './ModalFooter'
  import { mapState } from 'vuex'
  export default {
    components: { AppModalBody, AppModalFooter },
    computed: {
      ...mapState({
        show: ({ dispatch }) => dispatch.modal.form,
        isEdit: ({ dispatch }) => dispatch.isEdit
      }),
      title () {
        return this.isEdit ? '编辑任务' : '创建任务'
      },
      style () {
        return {
          top: '32px',
          marginBottom: '32px'
        }
      }
    }
  }
</script>
