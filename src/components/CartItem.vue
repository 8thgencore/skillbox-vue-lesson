<template>
  <li class="cart__item product">
    <div class="product__pic">
      <router-link :to="{ name: 'product', params: { id: item.id } }">
        <img
          :src="item.productOffer.product.preview.file.url"
          width="120"
          height="120"
          :alt="item.productOffer.title"
        />
      </router-link>
    </div>
    <router-link :to="{ name: 'product', params: { id: item.id } }">
      <h3 class="product__title">{{ item.productOffer.title }}</h3>
    </router-link>
    <p v-if="item.color" class="product__info--color">
      Цвет:
      <span
        ><i :style="{ 'background-color': item.color.color.code }"></i
        >{{ item.color.color.title }}</span
      >
    </p>
    <span class="product__code"> Артикул: {{ item.id }} </span>

    <ProductCounter :count="productQuantity" @update:count="updateProductQuantity" />

    <b class="product__price"> {{ totalPricePretty || "" }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";
import numberFormat from "@/helpers/numberFormat";
import { useStore } from "vuex";
import ProductCounter from "@/components/ProductCounter.vue";

export default {
  name: "CartItem",
  components: { ProductCounter },
  props: ["item"],

  setup(props) {
    const $store = useStore();

    const state = reactive({
      productQuantity: props.item.quantity,
    });

    const totalPricePretty = numberFormat(state.productQuantity * props.item.price);

    const updateProductQuantity = (value) => {
      if (value > 0) {
        $store.dispatch("updateCartProductQuantity", {
          basketItemId: props.item.id,
          quantity: value,
        });
      }
    };

    const deleteProduct = (value) => {
      $store.dispatch("deleteProductFromCart", { basketItemId: value });
    };

    return {
      ...toRefs(state),
      totalPricePretty,
      updateProductQuantity,
      deleteProduct,
    };
  },
};
</script>
