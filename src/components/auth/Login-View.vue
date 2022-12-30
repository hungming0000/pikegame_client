
<template>
  <body class="login">
    <div class="container">
      <div class="login-container-wrapper clearfix">
        <ul class="switcher clearfix">
          <li class="first logo active" data-tab="login">
            <a>登入大槍系統</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="login">
            <form class="form-horizontal login-form">
              <div class="form-group relative">
                <input
                  class="form-control input-lg"
                  id="login_username"
                  placeholder="請輸入帳號"
                  required=""
                  type="account"
                  v-model="account"
                  :disabled="loading"
                />
                <i class="fa fa-user"></i>
              </div>
              <div class="form-group relative">
                <input
                  class="form-control input-lg"
                  id="login_password"
                  placeholder="請輸入密碼"
                  required=""
                  type="password"
                  v-model="password"
                  :disabled="loading"
                />
                <i class="fa fa-lock"></i>
              </div>
              <div class="form-group relative">
                <input
                  class="form-control input-sm text identifyCodeInput"
                  v-model="identifyCodeInput"
                  type="identify"
                  placeholder="請輸入驗證碼"
                  style="margin-bottom: 5px"
                />
                <span
                  @click="refreshCode"
                  style="cursor: pointer; display: block"
                >
                  <Identify :identifyCode="identifyCode"></Identify>
                </span>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  class="btn submit-btn btn-success btn-lg btn-block"
                  @click="doLogin"
                  value="登入"
                  :disabled="loading"
                />
              </div>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
  <!-- <div style="height: 98vh; background-color: #d3d3d3" >
    <form class="form ">
      <div class="form-structor ">
        <div class="signup">
          <div class="cont_ba_opcitiy">
            <h2 class="form-title" id="signup"><span>or</span>使用者登入</h2>
          </div>
          <div class="form-holder">
            <input
              type="text"
              class="input"
              style="height: 43px"
              placeholder="請輸入帳號"
              v-model="account"
              :disabled="loading"
            />
            <input
              type="password"
              class="input"
              style="height: 43px"
              placeholder="請輸入密碼"
              v-model="password"
              :disabled="loading"
            />
            <br />
            <div>
              <input
                class="text identifyCodeInput"
                v-model="identifyCodeInput"
              />
              <span
                @click="refreshCode"
                style="cursor: pointer; display: block"
              >
                <Identify :identifyCode="identifyCode"></Identify>
              </span>
            </div>
          </div>
          <input
            type="submit"
            class="btn submit-btn"
            @click="doLogin"
            value="登入"
            :disabled="loading"
          />
          <br />
          <span style="display: none" v-if="error">{{ error }}</span>
        </div>
      </div>
    </form>
  </div> -->
</template>
  
  <script>
import axios from "axios";
import Identify from "./Identify-View.vue";
//import { Encrypt } from "@/utils/Aes.js";
import { encryptByCBC } from "@/utils/3DES.js";

export default {
  components: {
    Identify,
  },
  data() {
    return {
      account: "",
      password: "",
      loggedUser: "",
      error: "",
      loading: false,
      identifyCode: "",
      identifyCodeInput: "",
      // 驗證碼規則
      identifyCodes: "123456789ABCDEFGHGKMNPQRSTUVWXYZ",
    };
  },
  watch: {
    account() {
      this.error = "";
    },
    password() {
      this.error = "";
    },
  },
  created() {
    this.$emit("publuc_header", false);
  },
  methods: {
    doLogin() {
      this.loading = true;
      const url = this.GLOBAL.ApiUrl;

      if (this.account == "") {
        this.$buefy.toast.open({
          duration: 5000,
          message: `請輸入帳號。`,
          position: "is-bottom",
          type: "is-danger",
        });
        this.loading = false;
      } else if (this.password == "") {
        this.$buefy.toast.open({
          duration: 5000,
          message: `請輸入密碼。`,
          position: "is-bottom",
          type: "is-danger",
        });
        this.loading = false;
      } else if (this.identifyCodeInput == "") {
        this.$buefy.toast.open({
          duration: 5000,
          message: `請輸入驗證碼。`,
          position: "is-bottom",
          type: "is-danger",
        });
        this.loading = false;
      } else {
        if (
          this.identifyCodeInput.toLowerCase().trim() ==
          this.identifyCode.toLowerCase().trim()
        ) {
          //POST請求
          axios
            .post(url + "/Accountm/Login", {
              accountid: this.account,
              accpassword: encryptByCBC(this.password),
              // acm_password: Encrypt(this.password),
            })
            .then((response) => {
              this.loading = false;
              if (response.data.isSuccess == true) {
                this.loggedUser = response.data.Data[0].accountname;
                // sessionStorage.setItem(
                //   "userInfo",
                //   JSON.stringify(response.data.Data[0])
                // );
                sessionStorage.setItem(
                  "accountid",
                  JSON.stringify(response.data.Data[0].accountid)
                );
                sessionStorage.setItem(
                  "accountname",
                  response.data.Data[0].accountname
                );
                sessionStorage.setItem(
                  "accountgroupname",
                  JSON.stringify(response.data.Data[0].accountgroupname)
                );
                sessionStorage.setItem(
                  "accountstyle",
                  JSON.stringify(response.data.Data[0].accountstyle)
                );

                this.$router.push({ path: "/Home" });
                //this.$router.push({ name: "Home" });
                // this.$buefy.toast.open({
                //   duration: 5000,
                //   message: "登入成功!",
                //   type: "is-success",
                // });
              } else {
                this.error = "錯誤的帳號或密碼。";
                this.$buefy.toast.open({
                  duration: 5000,
                  message: `錯誤的帳號或密碼。`,
                  position: "is-bottom",
                  type: "is-danger",
                });
              }
            })
            .catch((error) => console.log(error));

          //this.emptyFields = true;
        } else {
          // console.log(this.identifyCodeInput);
          // console.log(this.identifyCode);
          this.$buefy.toast.open({
            duration: 5000,
            message: `驗證碼錯誤。`,
            position: "is-bottom",
            type: "is-danger",
          });
          this.loading = false;
        }
      }
    },
    // 切換驗證碼
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log(this.identifyCode);
    },
    // 生成隨機驗證碼
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[
            Math.floor(Math.random() * (this.identifyCodes.length - 0) + 0)
          ];
      }
    },
  },
  // beforeRouteLeave(to, from, next) {
  //       // setting next meta.keepAlive to true
  //       to.meta.keepAlive = true;
  //       next();
  //   } ,
  mounted() {
    this.refreshCode();
  },
};
</script>
  
  
<style scoped>
@media screen and (min-width: 1408px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
    min-height: 85vh;
  }
}
@media (min-width: 576px) {
  .container,
  .container-sm {
    max-width: 540px;
    min-height: 92vh;
  }
}
@import url(https://fonts.googleapis.com/css?family=Varela);
.login {
}
html {
  height: 100%;
}
body {
  font-family: "Varela", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  min-height: 100%;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
label {
  margin-bottom: 0;
}

a {
  color: #e1e1e1;
}

a:focus,
a:hover {
  color: #008080;
}

.checkbox-inline + .checkbox-inline,
.radio-inline + .radio-inline {
  margin-top: 6px;
}

body.login {
  /* background: rgba(255, 255, 255, 1); */
  background: rgba(241 236 236);
}

.relative {
  position: relative;
}
.switcher {
  margin-bottom: 100px;
}
ul.switcher li {
  list-style-type: none;
  width: 50%;
  position: absolute;
  top: 0;
}
.first {
  left: 0;
}
.second {
  right: 0;
}
.login-container-wrapper {
  max-width: 400px;
  min-height: 600px;
  margin: 11% auto 5%;
  padding: 40px;
  box-sizing: border-box;
  background: rgba(57, 89, 116, 0.8);
  position: relative;
  box-shadow: 0px 30px 60px -5px #000;
  background-image: url("../../../src/assets/pikebackground5.png");
  /* background-image: url("https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"); */
  background-size: cover;
  background-blend-mode: saturation;
}
.login-container-wrapper .logo,
.login-container-wrapper .welcome {
  font-size: 16px;
  letter-spacing: 1px;
}
.login-container-wrapper li {
  text-align: center;
  padding: 0 15px;
  background-color: #283443;
  height: 50px;
  line-height: 50px;
  box-shadow: inset 0 -2px 0 0 #ccc;
  cursor: pointer;
}
.login-container-wrapper li a {
  color: #fff;
}
.login-container-wrapper li a:hover {
  color: #ccc;
  text-decoration: none;
}

.login-container-wrapper li a:active,
.login-container-wrapper li a:focus {
  color: #fff;
  text-decoration: none;
}
.login-container-wrapper li.active {
  background-color: transparent;
  box-shadow: none;
}
.login-container-wrapper li.active a {
  border-bottom: 2px solid #fff;
  padding-bottom: 5px;
}

.login input:focus + .fa {
  color: #25a08d;
}
.login-form .form-group {
  margin-right: 0;
  margin-left: 0;
}

.login-form i {
  position: absolute;
  top: 0;
  left: 19px;
  line-height: 52px;
  color: rgba(40, 52, 67, 1);
  z-index: 100;
  font-size: 16px;
}

.login-form .input-lg {
  font-size: 16px;
  height: 52px;
  padding: 10px 25px;
  border-radius: 0;
}

.login input[type="identify"],
.login input[type="account"],
.login input[type="password"],
.login input:focus {
  background-color: rgba(40, 52, 67, 0.75);
  border: 0px solid #4a525f;
  color: #eee;
  border-left: 45px solid #93a5ab;
  border-radius: 40px;
}

.login input:focus {
  border-left: 45px solid #eee;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  background-color: rgba(40, 52, 67, 0.75) !important;
  background-image: none;
  color: rgb(0, 0, 0);
  border-color: #faffbd;
}

.login .checkbox label,
.login .checkbox a {
  color: #ddd;
  vertical-align: top;
}
.btn-success {
  background-color: #25a08d;
  background-image: none;
  padding: 8px 50px;
  margin-top: 20px;
  border-radius: 40px;
  border: 1px solid #25a08d;
  -webkit-transition: all ease 0.8s;
  -moz-transition: all ease 0.8s;
  transition: all ease 0.8s;
}

.btn-success:focus,
.btn-success:hover,
.btn-success.active,
.btn-success.active:hover,
.btn-success:active:hover,
.btn-success:active:focus,
.btn-success:active {
  background-color: #25a08d;
  border-color: #25a08d;
  box-shadow: 0px 5px 35px -5px #25a08d;
  text-shadow: 0 0 8px #fff;
  color: #fff;
  outline: none;
}
</style>