import { MODAL, CREATE, LIST, FORM_CHANGE, QUERY_CHANGE, EDIT, COMPANY_RESULT } from './keys'

import _ from 'lodash'

export default {
  [MODAL] (state, { name, show }) {
    state.modal[name] = show
    if (name === 'form' && show) {
      state.form = _.cloneDeep(state._form)
      state.isEdit = false
      state.loading.edit = false
    }
  },
  [CREATE] (state, { status }) {
    state.loading.create = status === 0
  },
  [LIST] (state, { list, page, size, total }) {
    state.list = list
    state.total = total
  },
  [FORM_CHANGE] (state, { key, value }) {
    state.form[key] = value
  },
  [QUERY_CHANGE] (state, { key, value }) {
    state.query.page = 1
    state.query[key] = value
  },
  [EDIT] (state, { status, info }) {
    state.loading.edit = status === 0
    state.isEdit = true
    if (status === 1) {
      state.form = { ...info }
    }
  },
  [COMPANY_RESULT] (state, info) {
    state.queryResult = info
  }
}
