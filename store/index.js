import axios from '~/plugins/axios'
import qs from 'querystring'

export const state = () => ({
  authUser: null,
  status: false,
  role: null,
  forgetUser: null
})

export const mutations = {
  SET_USER: (state, data) => {
    state.authUser = data.authUser
    state.status = data.isLogin
    state.role = data.role
  },
  SET_FORGET_USER: (state, data) => {
    state.forgetUser = data
  }
}

export const getters = {
  getAuthUser: (state) => state.authUser,
  getForgetUser: (state) => state.forgetUser
}

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    console.log(req.session)
    if (req.session && req.session.isLogin) {
      commit('SET_USER', req.session)
    }
    if (req.session && req.session.forget && req.session.forget.username) {
      commit('SET_FORGET_USER', req.session.forget.username)
    }
  },
  nuxtClientInit ({commit}, {req}) {
    if (req.session && req.session.isLogin) {
      commit('SET_USER', req.session)
    }
    if (req.session && req.session.forget && req.session.forget.username) {
      commit('SET_FORGET_USER', req.session.forget.username)
    }
  },
  async login ({commit}, params) {
    try {
      const result = await axios('/api/login', {
        method: 'post',
        data: qs.stringify(params)
      })
      console.log('login success!!')
      console.log(result.data)
      return commit('SET_USER', result.data)
    } catch (error) {
      console.log('login false')
      console.log(error)
    }
  },
  async logout ({commit}) {
    try {
      await axios.get('/api/logout')
      const data = {
        authUser: null,
        status: false,
        role: null
      }
      return commit('SET_USER', data)
    } catch (error) {
      console.log('logout false')
      console.log(error)
    }
  }
}
