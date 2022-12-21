<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-body">
        <div class="cbtn-wrap">
          <form class="form-signup" action="" method="post" name="form">
            <span class="row">
              <div class="col-sm-3 col-md-3"></div>
              <div class="col-sm-4 col-md-4" style="text-align: left">
                <label for="blue_equipmentid">藍方分數</label>
                <section>
                  <b-field>
                    <b-radio
                      v-model="bluehitposition"
                      native-value="0"
                      type="is-success"
                    >
                      頭
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio
                      v-model="bluehitposition"
                      native-value="1"
                      type="is-success"
                    >
                      軀幹
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio
                      v-model="bluehitposition"
                      native-value="2"
                      type="is-success"
                    >
                      四肢
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio
                      v-model="bluehitposition"
                      native-value="3"
                      type="is-danger"
                    >
                      掉槍
                    </b-radio>
                  </b-field>
                  <b-button type="is-danger is-light" class="clearb"  @click="clearblue"
                    >清除</b-button
                  >
                </section>
              </div>
              <div class="col-sm-5 col-md-5" style="text-align: left">
                <label for="red_equipmentid">紅方分數</label>
                <!-- <input
                  class="form-styling"
                  type="number"
                  name="redfraction"
                  v-model="redfraction"
                  placeholder=""
                  required
                /> -->
                <section>
                  <b-field>
                    <b-radio
                      v-model="redhitposition"
                      native-value="0"
                      type="is-success"
                    >
                      頭
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio
                      v-model="redhitposition"
                      native-value="1"
                      type="is-success"
                    >
                      軀幹
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio
                      v-model="redhitposition"
                      native-value="2"
                      type="is-success"
                    >
                      四肢
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio
                      v-model="redhitposition"
                      native-value="3"
                      type="is-danger"
                    >
                      掉槍
                    </b-radio>
                  </b-field>
                  <b-button type="is-danger is-light"  class="clearb" @click="clearred"
                    >清除</b-button
                  >
                </section>
              </div>
            </span>
            <b-button type="submit" variant="success" @click="SetFraction"
              >儲存</b-button
            >
            <!-- <a ng-click="checked = !checked" class="btn-signup">儲存</a> -->
          </form>
        </div>
      </div>
    </div>
    <div id="tfclose" class="close btn-close" @click="$emit('close-modal')">
      <img class="close-img" src="../../assets/close-button.png" alt="" />
    </div>
  </div>
</template> 
      
      
       <script>
import axios from "axios";

export default {
  inject: ["reloaddetial"],
  name: "Modal-view",
  props: ["sessiondetialid", "sessionid"],
  data: function () {
    return {
      scorelist: [],
      bluefraction: 0,
      redfraction: 0,
      bluehitposition: "",
      redhitposition: "",
      finalredfraction: "",
      finalbluefraction: "",
      redhitpositionVal: "",
      bluehitpositionVal: "",
    };
  },

  methods: {
    handleSave() {
      this.handleClose();
    },
    //儲存分數
    SetFraction() {
      console;
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Pikegame/Sessiondetial/EditFractionbyId", {
          sessiondetialid: this.sessiondetialid,
          sessionid: this.sessionid,
          redhitposition: this.redhitposition,
          bluehitposition: this.bluehitposition,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            // document.documentElement.querySelector("#tfclose").click();
            this.$emit("reloaddetial");
            // this.reload();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    clearblue(){
      this.bluehitposition=null;
    },
    clearred(){
      this.redhitposition=null;
    },
  },
  mounted() {
    const url = this.GLOBAL.ApiUrl;
    axios
      .post(
        url + "/Pikegame/Sessiondetial/GetSessiondetailById",
        this.sessiondetialid
      )
      .then((response) => {
        this.loading = false;
        if (response.data.isSuccess == true) {
          this.scorelist = response.data.Data.slice();
          this.bluehitposition=response.data.Data[0].bluehitposition;
          this.redhitposition=response.data.Data[0].redhitposition;
        } else {
          this.error = response.data.Message;
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>
      <style scoped>
@media only screen and (min-width: 960px) {
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
  margin: 130px 0 0 -25px;
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
  width: 35%;
  /* height: 45%; */
  height: 480px;
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

@media (max-width: 800px) {
  .container td:nth-child(4),
  .container th:nth-child(4) {
    display: none;
  }
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
.radio:hover,
.checkbox:hover {
  color: #fff;
}
.clearb{
   width: 75px;
  height: 30px;
  margin-top: 0px
}
</style> 