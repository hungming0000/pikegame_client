<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-body">
        <div class="cbtn-wrap">
          <form class="form-signup" action="" method="post" name="form">
            <b-field
              class="file is-primary"
              :class="{ 'has-name': !!file }"
              style="width: 50%; margin-left: 30%"
            >
              <b-upload
                v-model="file"
                class="file-label"
                accept=".jpg,.png,.jpeg"
                required
                validationMessage="請選擇圖片"
              >
                <span class="file-cta">
                  <b-icon class="file-icon" icon="upload"></b-icon>
                  <span class="file-label"
                    >點選上傳圖片 (.jpg.png.jpeg)</span
                  >
                </span>
                <span class="file-name" v-if="file">
                  {{ file.name }}
                </span>
              </b-upload>            
            </b-field>
            <label for="advertiseurl">廣告路徑</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input
                v-model="advertiseurl"
                placeholder="請輸入廣告路徑"
                required
              ></b-input>
            </b-field>

            <label for="advertisstarttime">下廣告時間起</label>
            <b-field style="width: 50%; margin-left: 25%">
              <date-picker
                v-model="advertisstarttime"
                type="datetime"
                required
              ></date-picker>
            </b-field>
            <label for="advertisendtime">下廣告時間迄</label>
            <b-field style="width: 50%; margin-left: 25%">
              <date-picker
                v-model="advertisendtime"
                type="datetime"
                required
              ></date-picker>
            </b-field>

            <label for="advertistimeperiod">播放時段</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input
                v-model="advertistimeperiod"
                placeholder="請輸入播放時段"
                required
              >
              </b-input>
            </b-field>

            <label for="advertiscosts">廣告費用</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input
                v-model="advertiscosts"
                placeholder="請輸入廣告費用"
                required
              >
              </b-input>
            </b-field>
            <label for="adsstatus">狀態</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-select
                placeholder="請選擇狀態"
                v-model="adsstatus"
                required
                expanded
              >
                <option value="1">上架</option>
                <option value="0">下架</option>
              </b-select>
            </b-field>
            <b-button type="submit" variant="success" @click="CreateAdvertise"
              >儲存</b-button
            >
            <!-- <a ng-click="checked = !checked" class="btn-signup">儲存</a> -->
          </form>
        </div>
      </div>
    </div>
    <div id="acclose" class="close btn-close" @click="$emit('close-modal')">
      <img class="close-img" src="../../assets/close-button.png" alt="" />
    </div>
  </div>
</template> 
      
      
       <script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  components: { DatePicker },
  inject: ["reload"],
  name: "Modal-view",
  //   props: ["accountid"],
  data: function () {
    return {
      advertiseurl: "",
      advertisstarttime: "",
      advertisendtime: "",
      advertistimeperiod: "",
      advertiscosts: "",
      adsstatus: "",
      adsstatusName: "",
      modifyuser: "",
      file: null,     
      formData: new FormData(),
    };
  },

  methods: {
    handleSave() {
      this.handleClose();
    },
    //儲存廣告
    CreateAdvertise() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Pikegame/Advertisesetting/CreateAdvertise", {
          advertiseurl: this.advertiseurl,
          advertisstarttime: moment(this.advertisstarttime).format(
            "yyyy-MM-DD HH:mm:ss"
          ),
          advertisendtime: moment(this.advertisendtime).format(
            "yyyy-MM-DD HH:mm:ss"
          ),
          advertistimeperiod: this.advertistimeperiod,
          advertiscosts: this.advertiscosts,
          adsstatus: this.adsstatus,
          modifyuser: JSON.parse(this.modifyuser),
          adsstatusName: this.adsstatusName,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.uploadpicture();
            this.$emit("reload");
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    async uploadpicture() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Api/UploadPicture", this.formData)
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
  },
  watch: {
    adsstatus: {
      handler: function () {
        switch (this.adsstatus) {
          case 0: //比賽制定者
            this.adsstatusName = "下架";
            break;
          case 1: //裁判
            this.adsstatusName = "上架";
            break;
        }
      },
    },
    file: {
      handler: function () {
        this.advertiseurl = this.file.name;
         
         this.formData.append("file", this.file, this.file.name);
       
      },
    },
  },
  created() {
    this.modifyuser = sessionStorage.getItem("accountid");
  },
};
</script>
      <style scoped>
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
  height: 65%;
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
button {
  margin-top: 17px;
}
label {
  display: contents;
}
</style> 