<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProducts }} товара </span>
      <ul class="colors">
        <span class="content__info"> Количество товаров: </span>
        <li
          class="colors__item pagination__link--arrow main-page__products-per-page-value"
          :class="{ 'main-page__products-per-page-value__selected': value === productsPerPage }"
          v-for="value in productsPerPageValues"
          :key="'products-per-page-' + value"
        >
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              :value="value"
              @click.prevent="productsPerPageChanged($event.target.value)"
            />{{ value }}
          </label>
        </li>
      </ul>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color-id="filterColorId"
        v-model:category-props="filterCategoryProps"
      />

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузки товаров
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>

        <ProductList :products="products" />

        <BasePagination v-model="currentPage" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from "@/components/product/ProductList.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import ProductFilter from "@/components/product/ProductFilter.vue";
import { API_BASE_URL } from "../config";
import axios from "axios";

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: "",
      filterPriceTo: "",
      filterCategoryId: 0,
      filterCategoryProps: null,
      filterColorId: "",

      currentPage: 1,
      productsPerPage: null,
      productsPerPageValues: [6, 9, 12],

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.preview.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    productsPerPage() {
      this.loadProducts();
    },
    currentPage() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterCategoryProps() {
      this.loadProducts();
    },
  },
  created() {
    this.productsPerPage = +localStorage.getItem("productsPerPage");
    if (!this.productsPerPage) {
      this.productsPerPageChanged(this.productsPerPageValues[0]);
    }
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);

      const params = {
        page: this.currentPage,
        limit: this.productsPerPage,
      };

      if (+this.filterPriceFrom !== 0) {
        params.minPrice = this.filterPriceFrom;
      }
      if (+this.filterPriceTo !== 0) {
        params.maxPrice = this.filterPriceTo;
      }
      if (this.filterCategoryId !== 0) {
        params.categoryId = this.filterCategoryId;
      }
      if (this.filterCategoryProps?.size) {
        [...this.filterCategoryProps.keys()].forEach((propName) => {
          params[`props[${propName}]`] = this.filterCategoryProps.get(propName);
        });
      }

      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, { params })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
    productsPerPageChanged(value) {
      console.log(value);
      this.currentPage = 1;
      this.productsPerPage = +value;
      localStorage.setItem("productsPerPage", value);
    },
  },
};
</script>

<style scoped>
.main-page__catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-page__products-per-page-value {
  padding: 0 5px;
}

.main-page__products-per-page-value__selected {
  background-color: #9eff00;
  font-weight: 600;
}
</style>
