import _ from 'lodash'

const form = {
  username: '',
  mobile: '',
  company: ''
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
