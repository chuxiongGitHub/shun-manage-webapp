import fetch from './fetch'

export const list = params => fetch.get('/v1/taskServer/list', { params })

export const create = payload => fetch.post('/v1/taskServer/create', payload)

export const save = payload => fetch.put('/v1/taskServer/save', payload)

export const info = uuid => fetch.get(`v1/taskServer/${uuid}`)
