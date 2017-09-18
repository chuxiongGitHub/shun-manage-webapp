import _ from 'lodash'

const form = {
  name: '',
  installUser: '',
  useUser: '',
  signUser: '',
  money: '',
  time: '',
  remark: '',
  machineCode: '',
  machineTools: '',
  type: '',
  moneyType: ''
}
export default {
  list: [],
  total: 0,
  query: {
    page: 1,
    size: 10,
    searchKey: '',
    status: ''
  },
  modal: {
    form: false
  },
  isEdit: false,
  loading: {
    create: false,
    edit: false,
    resetPassword: false
  },
  _form: _.cloneDeep(form),
  form: _.cloneDeep(form)
}
