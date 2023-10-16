<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          :type="'radio'"
          :value="color.color.title"
          @change="$emit('update:selectedColorId', color.color.id)"
          :checked="selectedColorId === color.color.id"
        />
        <span class="colors__value" :style="'background-color: ' + color.color.code"> </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["colors", "selectedColorId"],
};
</script>
