import { LIST, CREATE, MODAL, QUERY_CHANGE, MODIFY, EDIT, SAVE, COMPANY_RESULT } from './keys'

import iview from 'iview'

import * as api from 'api/company'
import _ from 'lodash'

export default {
  async [LIST] ({ state, commit }) {
    commit(LIST, await api.list(state.query))
  },
  [QUERY_CHANGE] ({ commit, dispatch }, payload) {
    commit(QUERY_CHANGE, payload)
    dispatch(LIST)
  },
  async [CREATE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.address.name) throw new Error('商户地址不能为空')
      if (!form.name) throw new Error('商户名称不能为空')
      if (!/1\d{10}/.test(form.mobile)) throw new Error('联系人电话不正确')
      if (!form.username) throw new Error('联系人姓名不能为空')
      await api.create(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
  },
  // 禁用、启用设备
  async [MODIFY] ({ state, commit }, { mobile, data }) {
    await api.modify(mobile, { ...data })
    commit(LIST, await api.list(state.query))
  },
  async [EDIT] ({ commit }, uuid) {
    try {
      commit(EDIT, { status: 0 })
      commit(MODAL, { name: 'form', show: true })
      commit(EDIT, { status: 1, info: await api.info(uuid) })
    } catch ({ message }) {
      commit(EDIT, { status: -1 })
      iview.Message.error(message)
    }
  },
  async [SAVE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.address.name) throw new Error('公司地址不能为空')
      if (!form.name) throw new Error('公司名称不能为空')
      await api.save(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
  },
  async [COMPANY_RESULT] ({ commit }, searchKey) {
    if (!_.trim(searchKey)) {
      commit(COMPANY_RESULT, [])
      return
    }
    commit(COMPANY_RESULT, await api.query(searchKey))
  }
}
