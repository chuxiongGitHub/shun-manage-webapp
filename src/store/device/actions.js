import { LIST, CREATE, MODAL, QUERY_CHANGE, MODIFY, EDIT, SAVE } from './keys'

import iview from 'iview'

import * as api from 'api/machine'

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
      if (!form.machineCode) throw new Error('设备编码不能为空')
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
  async [EDIT] ({ commit }, machineCode) {
    try {
      commit(EDIT, { status: 0 })
      commit(MODAL, { name: 'form', show: true })
      commit(EDIT, { status: 1, info: await api.info(machineCode) })
    } catch ({ message }) {
      commit(EDIT, { status: -1 })
      iview.Message.error(message)
    }
  },
  async [SAVE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.machineCode) throw new Error('设备编码不能为空')
      await api.save(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
  }
}
