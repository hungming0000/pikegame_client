<template>
  <div class="highlight-banner">
    <div class="container h-100">
      <div class="row p-6 h-100 justify-content-center align-items-center">
        <!--banner畫面-->
        <div class="col-sm-12 col-md-12 videobanner" style="text-align: center">         
          <swiper
            :options="swiperOption"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="item in youtubelist" :key="item.videoid">
              <!-- <video
                ref="video"
                class="video-js vjs-default-skin"
                width="600"
                height="400"
                controls
              >
                <source src="https://www.youtube.com/watch?v=R1oGwmHYnUQ&list=RDGMEMXdNDEg4wQ96My0DhjI-cIgVMR1oGwmHYnUQ&start_radio=1" />
              </video> -->
              <section>
                <LazyYoutube
                  ref="youtubeLazyVideo"
                  :src="item.videourl"
                  max-width="720px"
                  aspect-ratio="16:9"
                  thumbnail-quality="standard"
                />
              </section>
              <b-button type="is-warning is-light">{{
                item.videotitle
              }}</b-button>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  name: "highlight-banner",
  props: {
    msg: String,
  },
  components: {
    "swiper-slide": SwiperSlide,
    Swiper,
  },
  data() {
    return {
      // youtubeLink: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      youtubelist: [],
      videotitle: "",
      swiperOption: {
        slidesPerView: 1,
        // 设置分页器
        pagination: {
          el: ".swiper-pagination_",
          // 设置点击可切换
          clickable: true,
        },
        // 设置前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next_1",
          prevEl: ".swiper-button-prev_1",
        },
        // 设置自动轮播
        autoplay: {
          delay: 50000, // 5秒切换一次
        },
        // 设置轮播可循环
        //loop: true,
      },
    };
  },
  methods: {
    onSwiper() {},
    onSlideChange() {},

    async GetVideosetting() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Videosetting/GetPutonVideo", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.youtubelist = response.data.Data.slice();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.GetVideosetting();
  },
};
</script>

<style scoped>
@media only screen and (max-width: 480px) {
  .p-6 {
    padding: 0rem !important;
  }
  .videobanner {
    margin-top: 180px;
  }
}
.swiper-wrapper {
  text-align: center;
}
.highlight-banner {
  width: 100%;
  min-height: 528px;
  text-align: left;
  /* background-color: burlywood; */
}
h2 {
  margin-bottom: 0;
  margin-top: 2rem;
}
.input {
  padding: 5px;
  max-width: 720px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 90%;
}

.buttons {
  margin-top: 25px;
}
</style>