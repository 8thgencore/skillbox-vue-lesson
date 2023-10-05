<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      href="#"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ProductColors :colors="colors" />
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import ProductColors from "./ProductColors.vue";

export default {
  data() {
    return {
      color: "#73B6EA",
    };
  },
  props: ["product"],
  components: {
    ProductColors,
  },
  filters: { numberFormat },
  computed: {
    colors() {
      return this.product.colors;
    },
  },
};
</script>
