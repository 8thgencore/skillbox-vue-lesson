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
      <!-- <a href="#" @click.prevent="openQuickView(product.id)"> {{ product.title }} </a> -->
      {{ product.title }}
    </h3>

    <span class="catalog__price"> {{ pricePretty }} ₽ </span>
    <ProductColors :colors="colors" v-model:selected-color-id="selectedColorId" />

    <ul v-if="product.mainProp" class="sizes">
      <li class="sizes__item" v-for="offer in product.offers" :key="offer.id">
        <label class="sizes__label">
          <input
            class="sizes__radio sr-only"
            type="radio"
            :value="offer.id"
            v-model="selectedProductOffer"
            @input="doOfferChange(offer.id)"
          /><span class="sizes__value">{{ offer.propValues?.[0]?.value }}</span>
        </label>
      </li>
    </ul>
  </li>
  <BaseModal v-model:open="isQuickViewOpen">
    <ProductQuickView :product-id="currentProductId" />
  </BaseModal>
</template>

<script>
import { ref, computed, defineAsyncComponent, h, watch } from "vue";
import numberFormat from "@/helpers/numberFormat";
import ProductColors from "@/components/product/ProductColors.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import ProductQuickView from "@/components/product/ProductQuickView.vue";

export default {
  props: {
    product: Object,
  },
  components: {
    ProductColors,
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => ProductQuickView,
      delay: 0,
      loadingComponent: () => h("div", "Loading..."),
    }),
  },
  setup(props) {
    const currentProductId = ref(null);
    const selectedProductOffer = ref(props.product.offers?.[0]?.id);
    const selectedColorId = ref(props.product.colors?.[0]?.color?.id);

    const isQuickViewOpen = computed(() => currentProductId.value !== null);
    const pricePretty = computed(() => numberFormat(props.product.price));
    const colors = computed(() => props.product.colors);

    const openQuickView = (productId) => {
      currentProductId.value = productId;
    };

    const doOfferChange = (offerId) => {
      selectedProductOffer.value = offerId
        ? props.product.offers?.find((offer) => offer.id === offerId)
        : props.product.offers?.[0];
    };

    return {
      isQuickViewOpen,
      openQuickView,

      currentProductId,
      colors,

      doOfferChange,
      selectedProductOffer,

      selectedColorId,

      pricePretty,
    };
  },
};
</script>
