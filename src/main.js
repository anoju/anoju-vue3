import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';

import './assets/scss/front.scss';

const app = createApp(App);

// swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
app.component('SwiperContain', Swiper);
app.component('SwiperSlide', SwiperSlide);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Components 폴더 내의 모든 Vue 및 JavaScript 파일 가져오기
const files = require.context('@/components', true, /\.(vue|js)$/);
files.keys().forEach((key) => {
  const name = key.replace(/^.+\/([^/]+)\.\w+$/, '$1'); // 파일 이름 추출
  const component = files(key).default; // 컴포넌트 가져오기
  // console.log('Registering component:', name); // 등록된 컴포넌트 확인
  app.component(name, component); // 전역으로 컴포넌트 등록
});

app.use(router).mount('#app');
