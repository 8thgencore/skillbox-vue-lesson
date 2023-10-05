<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> Товаров в корзине: {{ countProducts }} </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ (totalPrice || 0) | numberFormat }} ₽</span>
          </p>

          <router-link
            class="cart__button button button--primery"
            :to="{ name: 'order' }"
            type="submit"
            tag="button"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem.vue";

export default {
  name: "CartPage",
  components: { CartItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: "cartDetailsProducts",
      totalPrice: "cartTotalPrice",
      countProducts: "cartCountProducts",
    }),
  },
};
</script>
