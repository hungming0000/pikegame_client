<template>
  <div class="homeindex-view">
    
    <Marquee></Marquee>
    <Highlight></Highlight>
    <Advertise></Advertise>
  </div>
</template>
  <script>
import Marquee from "./views/Marquee-View.vue";
import Highlight from "./views/Highlight-View.vue";
import Advertise from "./views/Advertise-View.vue";

export default {
  name: "homeindex-view",
  components: {
    Marquee,
    Highlight,
    Advertise,
  },
  created() {
    this.$emit("publuc_header", false);
  },
};
</script>
  
<!-- 
   <template>
<swiper
      :options="swiperOption"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
>
        <swiper-slide>123</swiper-slide>
        <swiper-slide>456</swiper-slide>
        <swiper-slide>789</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
</swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
    'swiper-slide':SwiperSlide,
    Swiper
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        // 设置分页器
        pagination: {
          el: '.swiper-pagination',
          // 设置点击可切换
          clickable: true
        },
        // 设置前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 设置自动轮播
        autoplay: {
          delay: 5000 // 5秒切换一次
        },
        // 设置轮播可循环
        loop: true
      }
    }
  },
  methods: {
    onSwiper () {

    },
    onSlideChange () {

    }
  }
}
</script> -->