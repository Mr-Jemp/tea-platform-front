import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'

import Nav from './components/public/Nav.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);
// Vue.use(MuseUI);

//mint-ui
import { Badge } from 'mint-ui';
Vue.component("mt-badge", Badge);
import { Actionsheet } from 'mint-ui';
Vue.component("mt-actionsheet", Actionsheet);

// Vue.use(MuseUI);
Vue.config.productionTip = false;

Vue.component("my-nav", Nav);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
