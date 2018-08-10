import axios from '~/plugins/axios'
import qs from 'querystring'

export const state = () => ({
  authUser: null,
  status: false,
  role: null
})

export const mutations = {
  SET_USER: (state, data) => {
    state.authUser = data.authUser
    state.status = data.isLogin
    state.role = data.role
    console.log(data)
  }
}

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    console.log(req.session)
    if (req.session && req.session.isLogin) {
      commit('SET_USER', req.session)
    }
  },
  nuxtClientInit ({commit}, {req}) {
    if (req.session && req.session.isLogin) {
      commit('SET_USER', req.session)
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
  async logout ({commit}) {
    await axios.get('/api/logout'
    ).then(function (response) {
      const data = {
        authUser: null,
        status: false,
        role: null
      }
      return commit('SET_USER', data)
    })
  }
}
