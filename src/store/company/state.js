import _ from 'lodash'

const form = {
  name: '',
  code: '',
  username: '',
  mobile: '',
  address: { name: '', position: null },
  desc: '',
  machineCode: ''
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
    edit: false
  },
  _form: _.cloneDeep(form),
  form: _.cloneDeep(form)
}
