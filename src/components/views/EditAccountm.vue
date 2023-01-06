<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-body">
        <div class="cbtn-wrap">
          <form class="form-signup" action="" method="post" name="form">
            <label for="accountid">帳號</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input v-model="accountid" disabled></b-input>
            </b-field>

            <label for="accountname">使用者名稱</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input
                v-model="accountname"
                placeholder="請輸入使用者名稱"
                required
              ></b-input>
            </b-field>

            <label for="accpassword">使用者密碼</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input
                type="password"
                v-model="accpassword"
                placeholder="請輸入密碼"
                password-reveal
                required
              >
              </b-input>
            </b-field>
            <label for="accountstyle">帳號類型</label>
            <b-field>
              <b-select
                placeholder="請選擇帳號類型"
                v-model="accountstyle"
                onchange="onChange($event)"
                required
              >
                <option
                  v-for="item in AccountstylenameList"
                  :value="item.accountstyle"
                  :key="item.accountstylename"
                >
                  {{ item.accountstylename }}
                </option>
              </b-select>
            </b-field>
            <label for="accountgroupname">武館名稱</label>
            <b-field style="width: 50%; margin-left: 25%">
              <b-input
                v-model="accountgroupname"
                placeholder="請輸入武館名稱"                
              ></b-input>
            </b-field>
           
            <b-button type="submit" variant="success" @click="EditAccountm"
              >儲存</b-button
            >
            <!-- <a ng-click="checked = !checked" class="btn-signup">儲存</a> -->
          </form>
        </div>
      </div>
    </div>
    <div id="addclose" class="close btn-close" @click="$emit('close-modal')">
      <img class="close-img" src="../../assets/close-button.png" alt="" />
    </div>
  </div>
</template> 
      
      
<script>
import axios from "axios";

export default {
  inject: ["reload"],
  name: "Modal-view",
  props: ["Paccountid"],
  data: function () {
    return {
      AccountstylenameList: [],
      accountid: "",
      accountname: "",
      accpassword: "",
      accountgroupname: "",
      accountstyle: "",
    };
  },

  methods: {
    handleSave() {
      this.handleClose();
    },
    GetAccount() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Accountm/GetAccountmById",
          JSON.stringify(this.Paccountid)
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.accountid = response.data.Data[0].accountid;
            this.accountname = response.data.Data[0].accountname;
            this.accpassword = response.data.Data[0].accpassword;
            this.accountgroupname = response.data.Data[0].accountgroupname;
            this.accountstyle = response.data.Data[0].accountstyle;
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //帳號類型
    GetAccountstylename() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Accountm/GetAccountstylename", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.AccountstylenameList = response.data.Data;
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //儲存帳號
    EditAccountm() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Accountm/EditAccountm", {
          accountid: this.accountid,
          accountname: this.accountname,
          accpassword: this.accpassword,
          accountgroupname: this.accountgroupname,
          accountstyle: this.accountstyle,
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
  },  
  mounted() {
    this.GetAccountstylename();
    this.GetAccount();
  },
};
</script>
      <style scoped>
@media only screen and (max-width: 480px) {
  .modal-content {
    width: 82% !important;
    height: 65%;
    margin-top: 130px;
  }
  .close {
    margin: 34.7% 0 0 -53px !important;
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
.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 6.7% 0 0 -25px;
  cursor: pointer;
}
.close-img {
  width: 25px;
}
.check {
  width: 150px;
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
.container th h1 {
  font-weight: bold;
  font-size: 1em;
  text-align: left;
  color: #185875;
}

.container td {
  font-weight: normal;
  font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;
}

.container {
  text-align: left;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
  display: table;
  padding: 0 0 8em 0;
}

.container td,
.container th {
  padding-bottom: 2%;
  padding-top: 2%;
  padding-left: 2%;
}

/* Background-color of the odd rows */
.container tr:nth-child(odd) {
  background-color: #323c50;
}

/* Background-color of the even rows */
.container tr:nth-child(even) {
  background-color: #2c3446;
}

.container th {
  background-color: #1f2739;
}

.container td:first-child {
  color: #fb667a;
}

.container tr:hover {
  background-color: #464a52;
  -webkit-box-shadow: 0 6px 6px -6px #0e1119;
  -moz-box-shadow: 0 6px 6px -6px #0e1119;
  box-shadow: 0 6px 6px -6px #0e1119;
}

.container td:hover {
  background-color: #fff842;
  color: #403e10;
  font-weight: bold;

  box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
    #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
  transform: translate3d(6px, -6px, 0);

  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: all;
  transition-timing-function: line;
}

@media (max-width: 800px) {
  .container td:nth-child(4),
  .container th:nth-child(4) {
    display: none;
  }
}
/*Form Style*/
.form-styling {
  width: 50%;
  height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
}
.form-signup-left {
  transform: translateX(-399px);
  opacity: 1;
}

.form-signup-down {
  top: 0px;
  opacity: 0;
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
</style> 