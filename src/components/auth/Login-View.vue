
<template>
  <div style="height: 98vh; background-color: #d3d3d3">
    <form class="form">
      <div class="form-structor">
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
  </div>
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
                sessionStorage.setItem("accountid",JSON.stringify(response.data.Data[0].accountid));
                sessionStorage.setItem("accountname",JSON.stringify(response.data.Data[0].accountname));
                sessionStorage.setItem("accountgroupname",JSON.stringify(response.data.Data[0].accountgroupname));


                this.$router.push({ name: "Home" });
                this.$buefy.toast.open({
                  duration: 5000,
                  message: "登入成功!",
                  type: "is-success",
                });
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
          console.log(this.identifyCodeInput);
          console.log(this.identifyCode);
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
  mounted() {
    this.refreshCode();
  },
};
</script>
  
  
  <style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
html,
body {
  position: relative;
  /* min-height: 100vh; */
  /* background-color: #e1e8ee; */
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.form-structor {
  background-color: #222;
  border-radius: 15px;
  height: 650px;
  width: 500px;
  position: relative;
  overflow: hidden;
  position: absolute;
  top: 18%;
  left: 38%;
}
.form-structor::after {
  content: "";
  /* opacity: 0.8; */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 500px;
  background-image: url("../../../src/assets/pikebackground4.png");
  /* background-image: url("https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100"); */
}
.form-structor .signup {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slide-up {
  top: 5%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slide-up .form-holder,
.form-structor .signup.slide-up .submit-btn {
  opacity: 0;
  visibility: hidden;
}
.form-structor .signup.slide-up .form-title {
  font-size: 1em;
  cursor: pointer;
}
.form-structor .signup.slide-up .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-title {
  color: #fff;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .signup .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-holder {
  border-radius: 15px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
}
.form-structor .signup .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .signup .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .signup .submit-btn {
  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);
}
.form-structor .login {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -20px;
  -webkit-transform: translate(-50%, 0);
  background-color: #fff;
  width: 200%;
  height: 250px;
  border-radius: 50%;
  z-index: 4;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center {
  position: absolute;
  top: calc(50% - 10%);
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-title {
  color: #000;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .login .center .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder {
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
}
.form-structor .login .center .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .login .center .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .login .center .submit-btn {
  background-color: #6b92a4;
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);
}
.form-structor .login.slide-up {
  top: 90%;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .center {
  top: 10%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-holder,
.form-structor .login.slide-up .submit-btn {
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-title {
  font-size: 1em;
  margin: 0;
  padding: 0;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.identifyCodeInput {
  width: 150px;
  height: 30px;
  float: left;
  margin-left: 6px;
  border-radius: 6px;
  border-color: #d0d0d0;
}
.cont_ba_opcitiy {
  position: relative;
  background-color: rgba(187, 168, 170, 0.79);
  width: 80%;
  margin-left: 24px;
  border-radius: 3px;
  margin-top: 60px;
  padding: 15px 0px;
}
</style>