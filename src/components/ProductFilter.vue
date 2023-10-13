<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      v-bind="$attrs"
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <div v-if="categoryPropsLoading" class="props-loader">
        <DataLoader :width="70" />
      </div>
      <div v-else-if="categoryProps">
        <fieldset class="form__block" v-for="prop in categoryProps" :key="prop.id">
          <legend class="form__legend">{{ prop.title }}</legend>
          <ul class="check-list">
            <li class="check-list__item" v-for="values in prop.availableValues" :key="values.value">
              <label class="check-list__label">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  :value="values.value"
                  @input="addCategoryPropOption(prop.code, $event.target.value)"
                />
                <span class="check-list__desc">
                  {{ values.value }}
                  <span>({{ values.productsCount }})</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>
      </div>

      <!-- <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                :value="color.id"
                v-model="currentColorId"
              />
              <span
                class="colors__value"
                :style="{ backgroundColor: color.code }"
                :title="color.title"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset> -->

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config";
import { ref, watch, watchEffect, onMounted, computed, defineComponent } from "vue";
import DataLoader from "./DataLoader.vue";
import cloneDeep from "lodash.clonedeep";

export default defineComponent({
  components: { DataLoader },
  props: {
    modelValue: String,
  },

  setup(props, { emit }) {
    const currentPriceFrom = ref(props.priceFrom || 0);
    const currentPriceTo = ref(props.priceTo || 0);
    const currentCategoryId = ref(props.categoryId || 0);
    const currentCategoryProps = ref(props.categoryProps || new Map());

    const categoryPropsData = ref(null);
    const categoriesData = ref(null);
    const colorsData = ref(null);

    const categoryPropsLoading = ref(false);

    const submit = () => {
      emit("update:priceFrom", currentPriceFrom.value);
      emit("update:priceTo", currentPriceTo.value);
      emit("update:categoryId", currentCategoryId.value);
      emit("update:categoryProps", currentCategoryProps.value);
    };

    const reset = () => {
      emit("update:priceFrom", 0);
      emit("update:priceTo", 0);
      emit("update:categoryId", 0);
      emit("update:categoryProps", null);

      currentPriceFrom.value = 0;
      currentPriceTo.value = 0;
      currentCategoryId.value = 0;
      currentCategoryProps.value = new Map();
    };

    watchEffect(() => {
      currentPriceFrom.value = props.priceFrom || 0;
      currentPriceTo.value = props.priceTo || 0;
      currentCategoryId.value = props.categoryId || 0;
      currentCategoryProps.value = props.categoryProps || new Map();
    });

    onMounted(() => {
      loadCategories();
      loadColors();
    });

    watch(
      () => currentCategoryId.value,
      (newValue) => {
        loadCategoryProps(newValue);
      },
    );

    const loadCategories = () => {
      axios.get(API_BASE_URL + "/api/productCategories").then((response) => {
        categoriesData.value = response.data;
      });
    };

    const loadColors = () => {
      axios.get(API_BASE_URL + "/api/colors").then((response) => {
        colorsData.value = response.data;
      });
    };

    const loadCategoryProps = (value) => {
      currentCategoryProps.value = new Map();
      if (value !== 0) {
        categoryPropsLoading.value = true;

        setTimeout(() => {
          axios.get(API_BASE_URL + "/api/productCategories/" + value).then((response) => {
            const data = response.data;
            categoryPropsData.value = data;
          });

          categoryPropsLoading.value = false;
        }, 300);
      } else {
        categoryPropsData.value = null;
      }
    };

    const colors = computed(() => {
      return colorsData.value ? colorsData.value.items : [];
    });

    const categories = computed(() => {
      return categoriesData.value ? categoriesData.value.items : [];
    });

    const categoryProps = computed(() => {
      return categoryPropsData.value ? categoryPropsData.value.productProps : null;
    });

    const addCategoryPropOption = (propName, newValue) => {
      if (!currentCategoryProps.value) {
        currentCategoryProps.value = new Map();
      }

      if (currentCategoryProps.value.has(propName)) {
        let values = currentCategoryProps.value.get(propName);
        values = values.includes(newValue)
          ? values.filter((item) => item !== newValue)
          : [...values, newValue];

        if (values.length) {
          currentCategoryProps.value.set(propName, values);
        } else {
          currentCategoryProps.value.delete(propName);
        }
      } else {
        currentCategoryProps.value.set(propName, [newValue]);
      }
      currentCategoryProps.value = cloneDeep(currentCategoryProps.value);
      console.log(currentCategoryProps.value);
    };

    return {
      colors,
      categories,
      categoryProps,

      currentPriceFrom,
      currentPriceTo,
      currentCategoryId,
      currentCategoryProps,

      categoryPropsLoading,
      addCategoryPropOption,

      submit,
      reset,
    };
  },
});
</script>
