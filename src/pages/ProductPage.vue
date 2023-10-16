<template>
  <main class="content container" v-if="productStatus.isLoading">Загрузка товара...</main>
  <main class="content container" v-else-if="productStatus.isFailed">
    Не удалось загрузить товар
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title" />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ productOffer.title || product.name }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doAddToCart">
            <b class="item__price">
              {{ $filters.numberFormat(productOffer.price || product.price) }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ProductColors :colors="colors" v-model:selected-color-id="selectedColorId" />
            </fieldset>

            <fieldset class="form__block">
              <legend v-if="product.mainProp" class="form__legend">
                {{ product.mainProp.title }}:
              </legend>
              <ul v-if="product.mainProp" class="sizes">
                <li class="sizes__item" v-for="offer in product.offers" :key="offer.id">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      :value="offer.id"
                      v-model="selectedOfferId"
                    /><span class="sizes__value">{{ offer.propValues?.[0]?.value }}</span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <ProductCounter :count="productQuantity" @update:count="doUpdate" />

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
              <Transition name="fade" mode="out-in">
                <DataLoader v-if="productAddSending" :width="50" :height="50" />
                <DataLoadingError
                  v-else-if="productAddError"
                  :svg-color="'red'"
                  :no-message="true"
                  :svg-height="50"
                  :svg-width="50"
                />
                <DataProcessedSuccessfullyItem v-else-if="productAdded" :width="50" :height="50" />
              </Transition>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item" v-for="tab in productTabs" :key="tab.id">
            <a
              href="#"
              class="tabs__link"
              :class="{ 'tabs__link--current': tab.id === selectedTabId }"
              @click.prevent="selectedTabId = tab.id"
              >{{ tab.title }}</a
            >
          </li>
        </ul>

        <div class="item__content">
          <p v-if="selectedTabId === 1">
            <span v-if="product.content?.length">{{ product.content }}</span>
            <span v-else>К сожалению, описания к данному товару нет</span>
          </p>

          <div v-if="selectedTabId === 2">
            <div v-if="product.specifications?.length">
              <p v-for="specification in product.specifications" :key="specification.id">
                <span style="font-weight: 600">{{ specification.title }}</span
                >: {{ specification.value }}
              </p>
            </div>
            <span v-else>К сожалению, характеристик к данному товару нет</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ProductColors from "@/components/product/ProductColors.vue";
import ProductCounter from "@/components/product/ProductCounter.vue";
import DataLoadingError from "@/components/DataLoadingError.vue";
import DataLoader from "@/components/DataLoader.vue";
import DataProcessedSuccessfullyItem from "@/components/DataProcessedSuccessfullyItem.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import useProduct from "@/hooks/useProduct.js";
import productTabs from "@/data/productPageTabs.js";

export default defineComponent({
  components: {
    BaseModal,
    ProductColors,
    ProductCounter,
    DataLoadingError,
    DataLoader,
    DataProcessedSuccessfullyItem,
  },
  setup() {
    const $route = useRoute();
    const $store = useStore();

    const { product, category, colors, status: productStatus, fetchProduct } = useProduct();

    const productQuantity = ref(1);
    const productAdded = ref(false);
    const productAddSending = ref(false);
    const productAddError = ref(false);
    const isShowAddedMessage = ref(false);

    const selectedTabId = ref(1);

    const selectedOfferId = ref(product.offers?.[0]?.id);
    const selectedColorId = ref(product.colors?.[0]?.color?.id);

    const productOffer = computed({
      get() {
        return product.value.offers?.find((offer) => offer.id === selectedOfferId.value);
      },
      set(value) {
        selectedOfferId.value = value;
      },
    });

    const doUpdate = (value) => {
      productQuantity.value = value < 1 ? 1 : value;
    };
    const doAddToCart = () => {
      productAdded.value = false;
      productAddSending.value = true;
      productAddError.value = false;

      $store
        .dispatch("addProductToCart", {
          productOfferId: selectedOfferId.value,
          colorId: selectedColorId.value,
          quantity: productQuantity.value,
        })
        .catch((error) => {
          productAddError.value = true;
        })
        .then(() => {
          isShowAddedMessage.value = true;
          productAdded.value = true;
          productAddSending.value = false;
        });
    };

    // const doOfferChange = (offerId) => {
    //   selectedProductOffer.value = offerId
    //     ? product.offers?.find((offer) => offer.id === offerId)
    //     : product.offers?.[0];
    // };

    fetchProduct($route.params.id);

    watch(
      () => product.value,
      (productValue) => {
        if (productValue) {
          selectedOfferId.value = productValue.offers?.[0]?.id;
          selectedColorId.value = productValue.colors?.[0]?.color?.id;
        }
      },
      { immediate: true },
    );

    return {
      productQuantity,
      productData: product,
      productStatus,

      productAdded,
      productAddSending,
      productAddError,

      isShowAddedMessage,

      selectedColorId,
      selectedOfferId,
      productOffer,

      product,
      category,
      colors,

      productTabs,
      selectedTabId,

      doUpdate,
      doAddToCart,
    };
  },
});
</script>

<style>
.sizes__radio:checked ~ .sizes__value {
  color: var(--white);
}

.colors__radio:checked ~ .colors__value::before {
  border-color: var(--grey);
}
</style>
