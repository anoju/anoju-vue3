import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
const app = createApp(App);

// 스타일 적용
import './assets/scss/front.scss';

// title 설정
app.config.globalProperties.$metaTitle = (title) => {
  setMetaTitle(title);
};
app.provide('$metaTitle', (title) => {
  setMetaTitle(title);
});
function setMetaTitle(title) {
  let $title = document.title;
  const dividingLine = ' | ';
  if ($title.indexOf(dividingLine) > -1) $title = $title.split(dividingLine).pop();
  document.title = title + dividingLine + $title;
}

// Component 등록
import { registerComponents } from '@/components/index';
registerComponents(app);

// swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
app.component('SwiperContain', Swiper);
app.component('SwiperSlide', SwiperSlide);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// anime
import anime from 'animejs';
app.config.globalProperties.$anime = anime;
app.provide('$anime', anime);

app.use(router).mount('#app');
