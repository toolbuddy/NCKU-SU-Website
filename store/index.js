import axios from '~/plugins/axios'
import qs from 'querystring'

export const state = () => ({
  authUser: null,
  status: false
})

export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user
    state.status = !(user === null)
  }
}

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.session && req.session.isLogin) {
      commit('SET_USER', req.session.username)
    }
  },
  nuxtClientInit ({commit}, {req}) {
    if (req.session && req.session.isLogin) {
      commit('SET_USER', req.session.username)
    }
  },
  async login ({commit}, params) {
    await axios('/api/login', {
      method: 'post',
      data: qs.stringify(params)
    }).then(function (response) {
      console.log('login success!!')
      console.log(response.data)
      return commit('SET_USER', response.data)
    }).catch(function (error) {
      console.log('false')
      console.log(error)
    })
  },
  async logout ({commit}, params) {
    await axios.get('/api/logout'
    ).then(function (response) {
      return commit('SET_USER', null)
    })
  }
}
