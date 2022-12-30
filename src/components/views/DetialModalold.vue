 <template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- <div class="modal-header"></div> -->
      <div class="modal-body">       
        <div class="cbtn-wrap">
          <div id="cbtn-title"></div>
          <div class="cbtn-nav" id="nav-prev">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div class="cbtn-o" id="cbtn1">
            <div class="cbtn-i" data-mode="0">分數表</div>
          </div>
          <div class="cbtn-nav" id="nav-next">
            <i class="fas fa-chevron-right"></i>
          </div>
          <table class="container">
            <tr>
              <th
                v-for="column in Object.keys(SessiondetailList[0])"
                :key="column"
                style="color: white; width: 100px"
              >
                {{ column }}
              </th>
            </tr>
            <tr v-for="item in SessiondetailList" :key="item.accountid">
              <td
                style="color: #a7a1ae; width: auto"
                align="center"
                v-for="index in Object.keys(item)"
                :key="index"
              >
                <span v-if="item['選手'] == 'id'">
                  <span v-if="index == '選手'"> 編輯 </span>
                  <span v-else>
                    <b-button
                      @click="EditScore(item[index])"
                      v-permission="'EditScore'"
                    >
                      <b-icon
                        pack="fas"
                        icon="edit"
                        size="is-medium"
                        style="display: inline-block"
                        type="is-success"
                      ></b-icon> </b-button
                  ></span>
                </span>
                <span v-else>
                  {{ item[index] }}
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <button class="btn btn-success" @click="handleSave">Save</button>
        <button class="btn btn-secondary" @click="$emit('close-modal')">
          Close
        </button>
      </div> -->
    </div>
    <div class="close" @click="$emit('close-modal')">
      <!-- <font-awesome-icon icon="fa-solid fa-xmark-large" /> -->
      <!-- <font-awesome-icon icon="X" size="lg" /> -->
      <img class="close-img" src="../../assets/close-button.png" alt="" />
    </div>
    <!--新增場次-->
    <EditScoreModal
      v-if="showEditScoreModal"
      @close-modal="showEditScoreModal = false"
      @reloaddetial="reloaddetial"
      :sessiondetialid="Parentsessiondetialid"
      :sessionid="Parentsessionid"
    />
  </div>
</template> 


 <script>
import EditScoreModal from "./EditFraction.vue";
export default {
  components: {
    EditScoreModal,
  },
  inject: ["GetSessiondetail","reload"],
  name: "Modal-view",
  props: ["sessionid", "SessiondetailList"],
  data: function () {
    return {
      dataObj: {
        title: "",
        body: "",
      },
      showEditScoreModal: false,
      Parentsessiondetialid: "",
      listData: [],
      scoreData: [],
    };
  },
  created() {
    //this.initWebSocket();
  },
  destroyed() {
    //this.websock.close(); //离开路由之后断开websocket连接
  },
  provide() {
    return {
      reloaddetial: this.reloaddetial,
    };
  },
  methods: {
    handleSave() {
      this.handleClose();
    },
    handleClose() {
      this.$emit("close");
    },
    EditScore(sessiondetialid) {
      this.showEditScoreModal = true;
      this.Parentsessiondetialid = sessiondetialid;     
      this.Parentsessionid = this.sessionid;  
    },
    reloaddetial() {
      this.showEditScoreModal = false;     
      
      this.isReloadData = false;
      this.$emit("GetSessiondetail");
      this.$emit("reload");
      
      this.$nextTick(() => {
        this.isReloadData = true;
      });

      console.log('reloaddetial')
    },       
  },
  mounted() {},
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
  margin: 10% 0 0 -29px;
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
  width: 60%;
  height: 75%;
  margin-top: 189px;
}
.modal-body {
  /* background-color: #000; */
  background-color: #1f2739;
}
/* .modal-header{
	background-color: #000;
} */
button[data-v-a8fc13aa] {
  background-color: #fff;
  width: 50px;
  margin-top: 0px;
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
#cbtn-title {
  position: relative;
  font-family: Montserrat;
  color: #fff;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: underline;
}
.cbtn-o {
  display: inline-block;
  position: relative;
}
.cbtn-o > .cbtn-i {
  position: relative;
  z-index: 0;
  cursor: pointer;
  margin: 40px 20px;
  padding: 10px 25px;
  border-radius: 100px;
  font-family: Montserrat;
  font-weight: 600;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: 250ms cubic-bezier(0, 0.5, 0.5, 1);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cbtn-o > .cbtn-i[data-mode="0"] {
  background: #e96651;
  box-shadow: 0px 0px 0px #e96651;
}
.cbtn-o > .cbtn-i[data-mode="0"]:hover {
  transform: scale(0.9);
  background: #efaf60;
  box-shadow: 0px 0px 30px #efaf60;
}
.cbtn-o > .cbtn-i[data-mode="0"]:active {
  transform: scale(1);
}
.cbtn-o > .cbtn-i[data-mode="1"] {
  background: #3770a0;
  box-shadow: 0px 0px 0px #3770a0;
}
.cbtn-o > .cbtn-i[data-mode="1"]:hover {
  transform: scale(0.9);
  background: #77b6ea;
  box-shadow: 0px 0px 20px #77b6ea;
}
.cbtn-o > .cbtn-i[data-mode="1"]:active {
  transform: scale(0.6);
}
.cbtn-o > .cbtn-i[data-mode="2"] {
  background: #30a254;
  box-shadow: 0px 0px 0px #30a254;
  transition: 350ms cubic-bezier(0, 0.5, 0.5, 1);
}
.cbtn-o > .cbtn-i[data-mode="2"]:hover {
  transform: scale(0.9);
  background: #51e980;
  box-shadow: 0px 0px 30px #51e980;
}
.cbtn-o > .cbtn-i[data-mode="2"]:active {
  transform: scale(0.9) rotateX(-360deg);
}
.cbtn-o > .cbtn-i[data-mode="3"] {
  background: #8e54ff;
  box-shadow: 0px 0px 0px #8e54ff;
}
.cbtn-o > .cbtn-i[data-mode="3"]:hover {
  transform: scale(0.9);
  background: #a93ee0;
  box-shadow: 0px 0px 30px #a93ee0;
}
.cbtn-o > .cbtn-i[data-mode="3"]:active {
  transform: scale(0.9) rotate(-360deg);
}
.cbtn-o > .cbtn-i[data-mode="4"] {
  background: #f00;
  box-shadow: 0px 0px 0px #f00;
}
.cbtn-o > .cbtn-i[data-mode="4"]:hover {
  transform: scale(0.9);
  background: #f00;
  box-shadow: 0px 0px 30px #f00;
}
.cbtn-o > .cbtn-i[data-mode="4"]:active {
  transition: none;
  filter: blur(7px);
  color: transparent;
}
.cbtn-o > canvas {
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
}
.cbtn-nav {
  color: #fff;
  display: inline-block;
  position: relative;
  z-index: 1;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  text-shadow: 2px 2px 4px #111;
}
.cbtn-nav#nav-next {
  margin-left: 20px;
}
.cbtn-nav#nav-next::before {
  left: 15px;
}
.cbtn-nav#nav-prev {
  margin-right: 20px;
}
.cbtn-nav#nav-prev::before {
  left: 17px;
}
.cbtn-nav:hover::before {
  width: 40px;
  height: 40px;
}
.cbtn-nav::before {
  content: "";
  position: absolute;
  border-radius: 100px;
  top: 20px;
  transform: translate(-50%, -50%);
  height: 0px;
  width: 0px;
  background: #333;
  z-index: -1;
  transition: 150ms ease-in-out;
}
.next_anim {
  animation: next 600ms ease;
  pointer-events: none;
}
.prev_anim {
  animation: prev 600ms ease;
  pointer-events: none;
}
.info-wrap {
  font-family: Montserrat;
}
.info-wrap > .info-text {
  display: inline-block;
  color: #333;
  width: 30%;
  max-width: 300px;
  padding: 15px;
  background: #ccc;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
}
@keyframes next {
  0% {
    left: 0px;
    opacity: 1;
  }
  50% {
    left: 300px;
    opacity: 0;
  }
  50.1% {
    left: -300px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
@keyframes prev {
  0% {
    left: 0px;
    opacity: 1;
  }
  50% {
    left: -300px;
    opacity: 0;
  }
  50.1% {
    left: 300px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
.social {
  z-index: 1001;
  position: absolute;
  bottom: 20px;
  left: 30px;
}
.social .icon {
  display: inline-block;
}
.social .icon:hover img {
  transform: scale(0.8);
}
.social .icon img {
  display: inline-block;
  height: 40px;
  width: 40px;
  position: relative;
  transition: 150ms cubic-bezier(0, 0.5, 0.5, 1);
}
.social .icon::before {
  content: "";
  position: absolute;
  border-radius: 100px;
  top: 20px;
  left: 20px;
  transform: translate(-50%, -50%);
  height: 0px;
  width: 0px;
  background: #333;
  z-index: -1;
  transition: 150ms cubic-bezier(0, 0.5, 0.5, 1);
}
.social .icon:hover::before {
  height: 50px;
  width: 50px;
}
/*內容*/
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
/* 
body {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  line-height: 1.42em;
  color: #a7a1ae;
  background-color: #1f2739;
} */

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

.blue {
  color: #185875;
}
.yellow {
  color: #fff842;
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
</style> 