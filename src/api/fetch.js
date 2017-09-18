import axios from 'axios'

let headers = {}

if (process.env.NODE_ENV !== 'production') {
  headers['X-AIO-DEBUG'] = true
}

const instance = axios.create({
  baseURL: `${window.location.origin}/api`,
  headers,
  responseType: 'json'
})

instance.interceptors.response.use(response => Promise.resolve(response.data), error => {
  if (error.data && error.response.status < 500) {
    return Promise.reject(new Error(error.response.data.message))
  } else {
    return Promise.reject(error)
  }
})

export default instance
