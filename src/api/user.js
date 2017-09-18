import fetch from './fetch'

export const list = params => fetch.get('/v1/user/list', { params })

export const create = payload => fetch.post('/v1/user/create', payload)

export const info = mobile => fetch.get(`/v1/user/info/${mobile}`)

export const save = payload => fetch.put('/v1/user/save', payload)

export const modify = (mobile, payload) => fetch.post(`/v1/user/modify/${mobile}`, payload)

export const query = searchKey => fetch.get(`/v1/user/query/${searchKey}`)
