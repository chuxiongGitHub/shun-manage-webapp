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
        show: ({ device }) => device.modal.form,
        isEdit: ({ device }) => device.isEdit
      }),
      title () {
        return this.isEdit ? '编辑设备' : '创建设备'
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
