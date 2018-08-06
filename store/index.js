import Vue from 'vue'
import Vuex from 'vuex'
import axios from '~/plugins/axios'
import qs from 'querystring'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    authUser: null,
    status: false
  },
  mutations: {
    SET_USER: (state, user) => {
      state.authUser = user
      state.status = true
    }
  },
  actions: {
    nuxtServerInit ({commit}, {req}) {
      if (req.session && req.session.status) {
        commit('SET_USER', req.session.username)
      }
    },
    async login ({commit}, params) {
      axios('/api/login', {
        method: 'post',
        data: qs.stringify(params)
      }).then(function (response) {
        console.log('success')
        console.log(response.data)
        commit('SET_USER', response.data)
      }).catch(function (error) {
        console.log('false')
        console.log(error)
      })
    },
    async logout (commit, params) {

    }
  }
})

export default store
