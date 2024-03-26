import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import { registerComponents } from '@/components/index';

import './assets/scss/front.scss';

const app = createApp(App);

// swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
app.component('SwiperContain', Swiper);
app.component('SwiperSlide', SwiperSlide);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

registerComponents(app);

app.use(router).mount('#app');
