import Vuex from 'vuex'
import Vue from 'vue'

if (process.env.NODE_ENV !== 'production') {
  Vue.use(Vuex)
}

export default new Vuex.Store({
  modules: {
    map: require('./map').default,
    user: require('./user').default,
    auth: require('./auth').default,
    note: require('./note').default,
    dispatch: require('./dispatch').default,
    device: require('./device').default,
    company: require('./company').default
  }
})
