import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: [],
    // {id, quantity}
    cart: []
  },

  getters: {
    // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },

  actions: {
    // = methods
    fetchProducts({ commit }) {
      // make the call
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    },

    addProductToCart(context, product) {
      if (product.inventory > 0) {
        // find cartItem
        const cartItem = context.state.cart.find(
          item => item.id === product.id
        );
        if (!cartItem) {
          //pushProductToCart
          context.commit("pushProductToCart", product.id);
        } else {
          //incrementItemQuantity
          context.commit("incrementItemQuantity", cartItem);
        }
        // temporary remove a product fom the inventory
        context.commit("decrementProductInventory", product);
      }
    }

    // addToCart(context, product) {
    //   if (product.inventory > 0) {
    //     context.commit("pushProductToCart", product);
    //   } else {
    //     // show a out of stock message
    //   }
    // }
  },

  mutations: {
    // = setting and updating the state
    setProducts(state, products) {
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, cartItem) {
      cartItem.inventory--;
    }
  }
});
