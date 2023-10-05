<template>
  <li class="cart__item product">
    <div class="product__pic">
      <router-link :to="{ name: 'product', params: { id: item.product.id } }">
        <img :src="item.product.image" width="120px" height="120px" :alt="item.product.title" />
      </router-link>
    </div>
    <router-link :to="{ name: 'product', params: { id: item.product.id } }">
      <h3 class="product__title">
        {{ item.product.title }}
      </h3>
    </router-link>
    <p class="product__info product__info--color">
      Цвет:
      <!-- TODO -->
      <span>
        <i :style="{ backgroundColor: item.product.colors[0].code }"></i>
        {{ item.product.colors[0].title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <ProductCounter :count="productAmount" @update:count="update" />

    <b class="product__price"> {{ (item.amount * item.product.price || "") | numberFormat }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";
import ProductCounter from "@/components/ProductCounter.vue";

export default {
  name: "CartItem",
  components: { ProductCounter },
  props: ["item"],
  filters: {
    numberFormat,
  },
  computed: {
    productAmount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateCartProductAmount", {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions({
      deleteProduct: "deleteCartProduct",
    }),
    update(value) {
      if (value > 0) {
        this.productAmount = value;
      }
    },
  },
};
</script>
