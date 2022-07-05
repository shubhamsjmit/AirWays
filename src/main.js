import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import interceptorsSetup from '@/interceptor/HttpRequest'
import router from '@/router/Router.js' 
import store from './store'

axios.defaults.baseURL = process.env.VUE_APP_ECOMMERCE_FLIGHT_URL;

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store)
app.use(router)

interceptorsSetup();

app.mount('#app')
