import { LIST, QUERY_CHANGE, CREATE, MODAL, EDIT, SAVE } from './keys'

import * as api from 'api/dispatch'

import iview from 'iview'

export default {
  async [LIST] ({ state, commit }) {
    try {
      commit(LIST, await api.list(state.query))
    } catch ({ message }) {
      iview.Message.error(message)
    }
  },
  [QUERY_CHANGE] ({ commit, dispatch }, payload) {
    commit(QUERY_CHANGE, payload)
    dispatch(LIST)
  },
  async [CREATE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.name) throw new Error('请填写商户名称')
      if (!form.machineCode) throw new Error('请填写终端号')
      if (!form.time) throw new Error('请填写安装时间')
      if (!form.type) throw new Error('请填写工单类型')
      if (!form.installUser) throw new Error('请填写装机人')
      await api.create(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
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
      if (!form.username) throw new Error('请填写姓名')
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
