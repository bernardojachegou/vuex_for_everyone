import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null
  },

  getters: {
    // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      // let total = 0;
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity;
      // });
      // return total;
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
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

    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        // find cartItem
        const cartItem = state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          //pushProductToCart
          commit("pushProductToCart", product.id);
        } else {
          //incrementItemQuantity
          commit("incrementItemQuantity", cartItem);
        }
        // temporary remove a product fom the inventory
        commit("decrementProductInventory", product);
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "fail");
        }
      );
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
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    }
  }
});
