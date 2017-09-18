import fetch from './fetch'

export const create = payload => fetch.post('/v1/machine', payload)

export const list = params => fetch.get('/v1/machine', { params })

export const modify = (machineCode, payload) => fetch.post(`/v1/machine/modify/${machineCode}`, payload)

export const info = (machineCode) => fetch.get(`/v1/machine/info/${machineCode}`)

export const save = payload => fetch.put('/v1/machine/save', payload)

export const query = machineCode => fetch.get(`/v1/machine/query/${machineCode}`)
