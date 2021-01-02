import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: []
  },

  getters: {
    // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },

  actions: {
    // = methods
    fetchProducts() {
      // make the call
    }
  },

  mutations: {
    // = setting and updating the state
    setProducts(state, products) {
      state.products = products;
    }
  }
});
