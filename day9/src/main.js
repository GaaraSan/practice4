import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './components/App.vue'
import Weather from './components/Weather.vue'

import './assets/main.css'

const routes = [
    {path: "/", component: Weather},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
