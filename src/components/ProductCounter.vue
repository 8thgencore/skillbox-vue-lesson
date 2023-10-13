<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decrementAmount">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input v-model="amount" name="count" ref="counter" />

    <button type="button" aria-label="Добавить один товар" @click.prevent="incrementAmount">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";

export default {
  name: "ProductCounter",
  props: ["count"],
  setup(props, { emit }) {
    const amount = ref(props.count);

    const incrementAmount = () => {
      amount.value++;
    };

    const decrementAmount = () => {
      if (amount.value > 0) {
        amount.value--;
      }
    };

    // Watch for changes in amount and emit update:count event
    watch(amount, (newValue) => {
      emit("update:count", newValue);
    });

    const focusInput = () => {
      // Focus input element when the component is mounted
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };

    const inputRef = ref(null);

    // Focus the input element after the component is mounted
    onMounted(() => {
      focusInput();
    });

    return {
      amount,
      incrementAmount,
      decrementAmount,
      inputRef,
    };
  },
};
</script>
