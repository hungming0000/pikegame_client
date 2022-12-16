<template>
    
  <div class="Marquee-view">
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <!--header畫面左區-->
        <div class="col-sm-12 col-md-12">
          <div class="header-content">
            <div
              class="marquee text-truncate text-info"
              @mouseover="stop"
              @mouseout="lang"
            >
            <div v-html="mag"></div>
              <!-- {{ mag }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Marquee-view",
  props: {
    msg: String,
  },
  data() {
    return {
        SessionList:[],
        mag:'',
        //mag:"其他公告: 其他選項WNBA美國女子職業籃球聯賽-季後賽.因本為籃球選項賽事，凡下注於該賽事之單式全場視為有效注單，{則過關以1計算}如造成您的不便敬請見諒!!!***謝謝***",
        intervalId: null //data 定義一個定時器id
    };
  },  
  methods: {
    lang(){
      if(this.intervalId != null ) return;
      
      this.intervalId = setInterval(() => {
        //得到第一個字元
        var start = this.mag.substring(0,1)
       //得到最後一個字元
        var end = this.mag.substring(1)
        //後面與前面字元連接
        this.mag = end + start
      },100)
    },
    //停止計時器     
    stop(){
      clearInterval(this.intervalId)
      //當清除定時器之後，重新讓intervalId為null
      this.intervalId = null;
    },
    GetSessionForWebNow(){
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

          for(var i =0;i<this.SessionList.length;i++){

            this.mag+=`※比賽場次:${this.SessionList[i].sessionname}比賽時間: ${this.SessionList[i].sessiontime}    藍方選手:${this.SessionList[i].blue_account} 紅方選手 ${this.SessionList[i].red_account}`;
          }

            

          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },

  },
  mounted(){
    this.GetSessionForWebNow();
  }
};
</script>

<style >
.Marquee-view {
  padding-top: 1rem;
  width: 100%;
  /* min-height: 500px; */
  text-align: left;
  background-color: rgb(87, 134, 194);
}
.text-info {
    color: #f1f3f3!important;
}
</style>