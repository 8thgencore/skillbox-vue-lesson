import { API_BASE_URL } from "../config";
import { ref, computed, reactive } from "vue";
import axios from "axios";

export default function () {
  const productData = ref(null);

  const category = computed(() => productData.value.category);
  const colors = computed(() => productData.value.colors);

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });

  const fetchProduct = (productId) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    axios
      .get(API_BASE_URL + "/api/products/" + productId)
      .then((response) => {
        const product = response.data;

        productData.value = Object.assign(product, {
          image: product.preview.file.url,
        });
      })
      .catch(() => (fetchStatus.isFailed = true))
      .then(() => (fetchStatus.isLoading = false));
  };

  return {
    product: productData,
    category,
    colors,
    status: fetchStatus,

    fetchProduct,
  };
}
