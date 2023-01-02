<template>
  <div class="highlight-banner">
    <div class="container h-100">
      <div class="row p-6 h-100 justify-content-center align-items-center">
        <!--banner畫面-->
        <div class="col-sm-12 col-md-12 videobanner" style="text-align: center;">
          <section>
            <LazyYoutube
              ref="youtubeLazyVideo"
              :src="youtubeLink"
              max-width="720px"
              aspect-ratio="16:9"
              thumbnail-quality="standard"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "highlight-banner",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      // youtubeLink: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",    
      youtubeLink:'',  
    };
  },
  methods: {
    handleClick(event, ref) {
      this.$refs[ref][event]();
    },
    handleSearch(e, platform) {
      if (platform === "youtube") this.youtubeLink = e.target.value;
     
    },
    async GetVideosetting(){
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Videosetting/GetPutonVideo", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.youtubeLink = response.data.Data[0].videourl;
           
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));

    }
  },
  mounted(){
    this.GetVideosetting();
  }
};
</script>

<style scoped>
@media only screen and (max-width: 480px)  {
  .p-6 {
    padding: 0rem !important;
}
.videobanner{
  margin-top: 180px;
}
}
.highlight-banner {
 
  width: 100%;
  min-height: 568px;
  text-align: left;
  background-color: burlywood;
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