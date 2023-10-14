import { createStore } from "vuex";
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default createStore({
  state() {
    return {
      userAccessKey: null,
      cartProductsData: null,
      orderInfo: null,
    };
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProductsData = null;
    },
    updateCartProductQuantity(state, { basketItemId, quantity }) {
      const cartItem = state.cartProductsData.items?.find((item) => item.id === basketItemId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    deleteProductFromCart(state, { basketItemId }) {
      state.cartProductsData.items = state.cartProductsData.items?.filter(
        (item) => item.id !== basketItemId,
      );
    },
    updateUserAccessKey(state, accessKey) {
      this.state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, cartProductsData) {
      state.cartProductsData = cartProductsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          id: item.product.id,
          quantity: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailsProducts(state) {
      return state.cartProductsData?.items;
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts?.reduce(
        (result, item) => item.price * item.quantity + result,
        0,
      );
    },
    cartCountProducts(state, getters) {
      return getters.cartDetailsProducts?.length;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          context.commit("updateOrderInfo", response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem("userAccessKey", response.data.user.accessKey);
            context.commit("updateUserAccessKey", response.data.user.accessKey);
          }
          context.commit("updateCartProductsData", response.data);
        });
    },
    addProductToCart(context, payload) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, payload, {
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          context.commit("updateCartProductsData", response.data);
        });
    },
    updateCartProductQuantity(context, { basketItemId, quantity }) {
      context.commit("updateCartProductQuantity", { basketItemId, quantity });

      if (quantity < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios
        .put(
          `${API_BASE_URL}/api/baskets/products`,
          { basketItemId, quantity },
          { params: { userAccessKey: context.state.userAccessKey } },
        )
        .then((response) => {
          context.commit("updateCartProductsData", response.data);
        })
        .catch(() => {
          // context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, payload) {
      context.commit("deleteProductFromCart", payload);

      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: payload,
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          context.commit("updateCartProductsData", response.data);
        });
    },
  },
});
