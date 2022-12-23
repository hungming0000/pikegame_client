import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import moment from 'moment'
import 'buefy/dist/buefy.css'
// import BootstrapVue from "bootstrap-vue";
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import {
  faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faChevronRight, faChevronDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { checkArray } from "./store/array.js"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'//輪播用
import LazyTube from "vue-lazytube";//影片播放

Vue.use(LazyTube);
Vue.use(VueAwesomeSwiper);
library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faChevronRight, faChevronDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload);
Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.config.productionTip = false

// 定義過濾器
Vue.filter('timeString', function (value, myFormat) {
  return moment(value).format(myFormat || 'YYYY-MM-DD, HH:mm:ss');
});



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  // customIconPacks: {
  //   fas: {
  //     sizes: {
  //       default: "lg",
  //       "is-small": "1x",
  //       "is-medium": "2x",
  //       "is-large": "3x"
  //     },
  //     iconPrefix: ""
  //   }
  // }
});

// Vue.use(BootstrapVue);
Vue.directive("permission", {
  inserted(el, binding) {
    let permission = binding.value;
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }

})


