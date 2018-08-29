import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}
