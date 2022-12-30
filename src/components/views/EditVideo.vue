<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-body">
          <div class="cbtn-wrap">
            <form class="form-signup" action="" method="post" name="form">
              <label for="videourl">影片路徑</label>
              <b-field style="width: 50%; margin-left: 25%">
                <b-input
                  v-model="videourl"
                  placeholder="請輸入影片路徑"
                  required
                ></b-input>
              </b-field>  
              <label for="videostatus">狀態</label>
              <b-field style="width: 50%; margin-left: 25%">
                <b-select
                  placeholder="請選擇狀態"
                  v-model="videostatus"
                  required
                  expanded
                >
                  <option value="1">上架</option>
                  <option value="0">下架</option>
                </b-select>
              </b-field>           
              <b-button type="submit" variant="success" @click="EditVideo"
                >儲存</b-button
              >
              <!-- <a ng-click="checked = !checked" class="btn-signup">儲存</a> -->
            </form>
          </div>
        </div>
      </div>
      <div id="vdclose" class="close btn-close" @click="$emit('close-modal')">
        <img class="close-img" src="../../assets/close-button.png" alt="" />
      </div>
    </div>
  </template> 
        
        
         <script>
  import axios from "axios";
  export default {   
    inject: ["reload"],
    name: "Modal-view",
    props: ["videoid"],
    data: function () {
      return {
        videourl: "",
        videostatus: "",       
        modifyuser: "",
      };
    },
  
    methods: {
      handleSave() {
        this.handleClose();
      },
      //儲存影片
      EditVideo() {        
        const url = this.GLOBAL.ApiUrl;
        axios
          .post(url + "/Pikegame/Videosetting/EditVideo", {
            videourl: this.videourl,           
            videostatus: this.videostatus,          
            modifyuser: JSON.parse(this.modifyuser)           
          })
          .then((response) => {
            this.loading = false;
            if (response.data.isSuccess == true) {
              this.$emit("reload");
            } else {
              this.error = response.data.Message;
            }
          })
          .catch((error) => console.log(error));
      },
      async GetVideosettingById(){
       
        const url = this.GLOBAL.ApiUrl;
        await axios
          .post(url + "/Pikegame/Videosetting/GetVideosettingById", JSON.stringify(this.videoid))
          .then((response) => {
            this.loading = false;
            if (response.data.isSuccess == true) {              
              this.videourl=response.data.Data[0].videourl;
              this.videostatus=response.data.Data[0].videostatus;
              this.modifyuser=response.data.Data[0].modifyuser;

            } else {
              this.error = response.data.Message;
            }
          })
          .catch((error) => console.log(error));
      },
    },    
    created() {
      this.modifyuser= sessionStorage.getItem("accountid");
    },
    mounted(){
            this.GetVideosettingById();
    }
  };
  </script>
        <style scoped>
           @media only screen and (max-width: 480px)  {
  .modal-content {
    width: 80% !important;
    height: 65%;
    margin-top: 130px;
  }
  .close {
    margin: 34.7% 0 0 -53px !important;
  }
  .modal-content {
  width: 80% !important;
  height: 45% !important;
  }
}
  @media only screen and (min-width: 769px) {
    .modal-content,
    .modal-card {
      margin: 0;
    }
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
  }
  .close {
    margin: 6.7% 0 0 -25px;
    cursor: pointer;
  }
  .close-img {
    width: 25px;
  }
  h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
  }
  p {
    font-size: 16px;
    margin: 20px 0;
  }
  button {
    background-color: #4591cf;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
  }
  
  .modal-content {
    width: 45%;
    height: 35%;
    margin-top: 130px;
  }
  .modal-body {
    /* background-color: #000; */
    background-color: #1f2739;
  }
  
  @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
  html,
  body {
    margin: 0px;
    background: #000;
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    line-height: 1.42em;
  
    background-color: #1f2739;
  }
  .cbtn-wrap {
    overflow: hidden;
    text-align: center;
    margin-top: 50px;
  }
  /*內容*/
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
  h1 {
    font-size: 3em;
    font-weight: 300;
    line-height: 1em;
    text-align: center;
    color: #4dc3fa;
  }
  
  h2 {
    font-size: 1em;
    font-weight: 300;
    text-align: center;
    display: block;
    line-height: 1em;
    padding-bottom: 2em;
    color: #fb667a;
  }
  
  h2 a {
    font-weight: 700;
    text-transform: uppercase;
    color: #fb667a;
    text-decoration: none;
  }
  
  label {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 13px;
    padding-left: 15px;
    padding-bottom: 10px;
    color: rgba(255, 255, 255, 0.7);
    display: block;
  }
  
  :focus {
    outline: none;
  }
  .cbtn-wrap {   
      margin-top: 10px;
  }
  </style> 