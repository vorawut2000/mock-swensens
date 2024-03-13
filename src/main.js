import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

import router from "./router";
app.use(router);

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import * as language from "./composables/useLanguage"
app.provide("language", language)


import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(far, fas, fab);
app.component('font-awesome-icon', FontAwesomeIcon)

import Button from "./components/button/button.vue"; 
import Input from "./components/input/input.vue";
import EmailInput from "./components/input/email-input.vue";
import InputButton from "./components/input/input-button.vue";
import Select from "./components/input/select.vue"

app.component("Button", Button);
app.component("Input", Input);
app.component("EmailInput", EmailInput);
app.component("InputButton", InputButton);
app.component("Select", Select);

app.component('VueDatePicker', VueDatePicker);

app.mount("#app");
