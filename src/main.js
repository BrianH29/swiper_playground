import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper);
Vue.component('swiper', VueAwesomeSwiper.Swiper);
Vue.component('swiper-slide', VueAwesomeSwiper.SwiperSlide);

new Vue({
  render: h => h(App),
}).$mount('#app')
