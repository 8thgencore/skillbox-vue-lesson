import { createApp, h } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.use(store);

app.config.globalProperties.$filters = {
  numberFormat(value) {
    return new Intl.NumberFormat().format(value);
  },
};

app.mount("#app");
