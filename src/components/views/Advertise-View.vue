<template>
  <div class="Advertise-View">
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <!--footer畫面左區-->
        
        <div class="col-sm-12 col-md-12">
          <swiper
            :options="swiperOption"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
          
            <swiper-slide> <img :src="banner1" height="200px" width="500px"/></swiper-slide>
            <swiper-slide><img :src="banner2" height="180px" width="430px"/></swiper-slide>
            <swiper-slide><img :src="banner3" height="180px" width="430px"/></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        
        <!--footer畫面右區-->
      </div>
    </div>
  </div>
</template>
  
  <script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

export default {
  name: "Advertise-View",
  props: {
    msg: String,
  },
  components: {
    'swiper-slide':SwiperSlide,
    Swiper,   
  },
  data () {
    return {
        banner1: banner1,
        banner2: banner2,
        banner3: banner3,

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
          delay: 50000 // 5秒切换一次
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
};
</script>
  
  <style >
.Advertise-View {
  /* padding-top: 7rem; */
  width: 100%;
  min-height: 361px;
  /* min-height: 200px; */
  text-align: left;
  color: #ffffff;
  background-color: darkslategray;
}
.swiper-wrapper{
    text-align: center;
}
</style>