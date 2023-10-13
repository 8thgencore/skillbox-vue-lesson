<template>
  <div v-if="productStatus.isLoading" class="product-data-loader">
    <DataLoader :width="200" :height="200" />
  </div>
  <div v-else-if="productStatus.isFailed" class="product-data-loader">
    <DataLoadingError :svg-height="100" :svg-width="100" />
  </div>
  <div v-else>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title" />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.name }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doAddToCart">
            <b class="item__price">{{ product.price }} ₽</b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ProductColors :colors="colors" />
            </fieldset>

            <div class="item__row">
              <ProductCounter :count="productAmount" @update:count="doUpdate" />

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <DataLoader v-if="productAddSending" :width="50" :height="50" />
            <DataProcessedSuccessfullyItem v-if="productAdded" :width="50" :height="50" />
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import DataLoadingError from "@/components/DataLoadingError.vue";
import DataLoader from "@/components/DataLoader.vue";
import DataProcessedSuccessfullyItem from "@/components/DataProcessedSuccessfullyItem.vue";
import ProductColors from "@/components/ProductColors.vue";
import ProductCounter from "@/components/ProductCounter.vue";

import { ref, defineComponent, watch } from "vue";
import useProduct from "@/hooks/useProduct";

export default defineComponent({
  props: {
    productId: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    ProductColors,
    ProductCounter,
    DataLoadingError,
    DataLoader,
    DataProcessedSuccessfullyItem,
  },
  setup(props) {
    const $store = useStore();
    const { product, category, colors, fetchProduct, status: productStatus } = useProduct();

    const selectedColor = ref("");
    const productAmount = ref(1);
    const productAdded = ref(false);
    const productAddSending = ref(false);

    const doUpdate = (value) => {
      productAmount.value = value < 1 ? 1 : value;
    };

    const doAddToCart = () => {
      productAdded.value = false;
      productAddSending.value = true;

      $store
        .dispatch("addProductToCart", {
          productOfferId: product.value.id,
          colorId: selectedColor.value,
          amount: productAmount.value,
        })
        .then(() => {
          productAdded.value = true;
          productAddSending.value = false;
          setTimeout(() => {
            productAdded.value = false;
          }, 2000);
        });
    };

    watch(
      () => props.productId,
      (value) => {
        if (value) {
          fetchProduct(value);
        }
      },
      { immediate: true },
    );

    return {
      selectedColor,
      productAmount,
      productData: product,
      productStatus,
      productAdded,
      productAddSending,

      product,
      category,
      colors,

      doUpdate,
      doAddToCart,
    };
  },
});
</script>

<style scoped>
.item {
  grid-template-columns: 1fr;
}
</style>
