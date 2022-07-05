import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      airports: []
    }
  },
  getters: {
    getAirports(state) {
      return state.airports
    } 
  },
  mutations: {
    setFlights(state, airports) {
      state.airports = airports;
    }
  },
  actions: {
  },
  modules: {
  }
})
