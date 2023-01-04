<template>
  <div class="Marquee-view">
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <!--header畫面左區-->
        <div class="col-sm-12 col-md-12">
          <div class="header-content">
            <!-- <marquee-text>
                    {{mag}} 
                </marquee-text> -->
            <!-- simple marquee text -->
            <marquee-text :duration="60" :paused="paused">
              <div
                @mouseenter="paused = !paused"
                @mouseleave="paused = false"
                style="background-color: floralwhite"
                v-html="mag"
              >
                <!-- {{mag}} -->
              </div>
            </marquee-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import MarqueeText from "vue-marquee-text-component";
export default {
  name: "Marquee-view",
  props: {
    msg: String,
  },
  components: {
    MarqueeText,
  },
  data() {
    return {
      NewsList: [],
      paused: false,
      mag: "",
      intervalId: null, //data 定義一個定時器id
    };
  },
  methods: {
    //取得場次
    GetSessionForWebNow() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Pikegame/Session/GetSessionForWebNow",
          this.Parentsessionid
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.SessionList = response.data.Data.slice();

            for (var i = 0; i < this.SessionList.length; i++) {
              this.mag += `<span style="color:red"> ※</span> 比賽場次:<span style="background-color: #BEBEBE;border-radius: 2px 2px 2px 2px;">${this.SessionList[i].sessionname}</span>     比賽時間: <span style="background-color: #BEBEBE;border-radius: 2px 2px 2px 2px;">${this.SessionList[i].sessiontime}</span>    藍方選手:<span style="background-color: #ACD6FF;border-radius: 2px 2px 2px 2px;">${this.SessionList[i].blue_account}</span>   紅方選手 <span style="background-color:#FF9797;border-radius: 2px 2px 2px 2px;">${this.SessionList[i].red_account}</span>   `;
            }
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //取得最新消息
    GetNewssetting() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Pikegame/Newssetting/GetNewssetting",
          this.Parentsessionid
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.NewsList = response.data.Data.slice();

            
              this.mag =response.data.Data[0].newsdescription;
            
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.GetNewssetting();
  },
};
</script>
  
<style scoped>
.Marquee-view {
  /* padding-top: 1rem; */
  width: 100%;
  /* min-height: 500px; */
  text-align: left;
  /* background-color: rgb(87, 134, 194); lightblue*/
  background-color: floralwhite;
}
</style>