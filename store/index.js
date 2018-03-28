export const state = () => ({
  sidebar: false,
  authUser: false
})

export const getters = {
  authUser: state => state.authUser
}

export const mutations = {
  SET_USER: function (state, user) {
    // console.log('$ mutations SET_USER')
    state.authUser = user
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  fetch ({redirect, store}) {
    if (store.state.authUser) {
      redirect('/')
    }
  },
  async login ({ commit }, user) {
    try {
      console.log('$store login' + JSON.stringify(user))
      // const { data } = await this.$axios.post('/api/login', {user.login, user.pwd})
      commit('SET_USER', user)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await this.$axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
