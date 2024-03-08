import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App);

import router from "./router";
app.use(router);

import Button from "./components/button/button.vue";

app.component("Button", Button);

app.mount("#app");
