import fetch from './fetch'

export const list = params => fetch.get('/v1/taskOld/list', { params })

export const create = payload => fetch.post('/v1/taskOld/create', payload)

export const save = payload => fetch.put('/v1/taskOld/save', payload)

export const info = uuid => fetch.get(`v1/taskOld/${uuid}`)
