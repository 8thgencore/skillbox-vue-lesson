import BaseFormField from "@/components/base/BaseFormField.vue";

export default {
  name: "BaseFormText",
  props: ["title", "error", "placeholder", "modelValue"],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  components: {
    BaseFormField,
  },
};
