import fetch from './fetch'

export const list = params => fetch.get('/v1/company/list', { params })

export const create = payload => fetch.post('/v1/company/create', payload)

export const edit = (uuid, payload) => fetch.put(`/v1/company/edit/${uuid}`, payload)

export const info = (uuid) => fetch.get(`/v1/company/info/${uuid}`)

export const save = payload => fetch.put('/v1/company/save', payload)

export const modify = (uuid, payload) => fetch.post(`/v1/company/modify/${uuid}`, payload)
