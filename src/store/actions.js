import shop from "@/api/shop";

export default {
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
};
