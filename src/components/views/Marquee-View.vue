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
              {{ mag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Marquee-view",
  props: {
    msg: String,
  },
  data() {
    return {
        mag:"其他公告: 其他選項WNBA美國女子職業籃球聯賽-季後賽.因本為籃球選項賽事，凡下注於該賽事之單式全場視為有效注單，{則過關以1計算}如造成您的不便敬請見諒!!!***謝謝***",
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
    }
  },
};
</script>

<style >
.Marquee-view {
  padding-top: 1rem;
  width: 100%;
  /* min-height: 500px; */
  text-align: left;
  background-color: rgb(47, 108, 189);
}
</style>