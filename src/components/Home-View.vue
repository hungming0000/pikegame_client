<template>
  <keep-alive v-if="isReloadData">
    <div class="tile ttzc-tile">
      <div class="tile-content">
        <div class="ttzc-table-wrap">
          <b-button
            style="float: right; margin-bottom: 10px; z-index: 1"
            type="is-primary is-light"
            @click="CreateTournament()" v-permission="'CreateTournament'"
            >新增比賽</b-button
          >
          <!--@details-open="(row) => showDetail(row['tournamentid'])"
        @details-open="(row) => $buefy.toast.open(`Expanded ${row['tournamentid']}`)"   :columns="columns"
        -->
          <b-table
            id="tournamenttable"
            :data="listData"
            :class="tableClassList"
            ref="table"
            detailed
            striped
            hoverable
            detail-key="tournamentid"
          >
            <b-table-column
              class="th-wrap is-centered"
              field="tournamentname"
              label="比賽名稱"
              :th-attrs="columnThAttrs"
              :td-attrs="columnTdAttrs"
              :searchable=true
              v-slot="props"
            >
              {{ props.row.tournamentname }}
            </b-table-column>
            <b-table-column
              class="th-wrap is-centered"
              field="tournamentdate"
              label="比賽日期"
              :td-attrs="columnTdAttrs"
              :th-attrs="columnThAttrs"
              :searchable=true
              v-slot="props"
            >
              {{ props.row.tournamentdate }}
            </b-table-column>
            <b-table-column
              class="th-wrap is-centered"
              label=""
              style="width: 50px"
              :td-attrs="columnTdAttrs"
              :th-attrs="columnThAttrs"
              v-slot="props"
            >
              <b-button
                @click="CreateSession(props.row.tournamentid)"
                type="is-info is-light" v-permission="'CreateSession'"
              >
                <b-icon
                  pack="fas"
                  icon="plus"
                  size="is-medium"
                  style="display: inline-block"
                  type="is-success"
                ></b-icon>
                <span style="margin-left: 5px; display: inline-block"
                  >新增場次</span
                ></b-button
              >
              <div class="nav">
                <!-- <b-button @click="btn">提示音</b-button> -->
                <!-- <easy-ring :open="open" :ring="ring" :src="music" /> -->
              </div>
            </b-table-column>

            <template #detail="props">
              <!-- <div>{{ props.row }}</div> #dbf6fd oneItem in filters.filter(item => {item.type == 'filter'}) <i class="fa-duotone fa-plus"></i>-->
              <article
                class="media"
                v-for="item in filterSessionDataMethod(props.row.tournamentid)"
                :key="item.sessionid"
              >
                <figure class="media-left"></figure>
                <div class="media-content">
                  <div class="content">
                    <span v-if="item.mstatus==0">
                    <b-button
                      @click="EditSession(item.sessionid)"
                      type="is-danger"
                      style="float: right"                     
                      v-permission="'EditSession'"
                    >
                      <b-icon
                        pack="fas"
                        icon="plus"
                        size="is-small"
                        style="display: inline-block"
                      ></b-icon>
                      <span style="margin-left: 5px; display: inline-block"
                        >編輯場次資訊</span
                      ></b-button
                    >
                  </span>
                    
                    <!-- <span v-if="item.mstatus==1||item.mstatus==0">
                    <b-button
                      @click="EditEquipment(item.sessionid)"
                      type="is-danger"
                      style="float: right"
                      v-if="item.is_equipment_exist"
                      v-permission="'EditEquipment'"
                    >
                      <b-icon
                        pack="fas"
                        icon="plus"
                        size="is-small"
                        style="display: inline-block"
                      ></b-icon>
                      <span style="margin-left: 5px; display: inline-block"
                        >編輯槍頭設備編號</span
                      ></b-button
                    >
                    <b-button
                      @click="CreateEquipment(item.sessionid)"
                      type="is-danger"
                      style="float: right"
                      v-permission="'CreateEquipment'"
                      v-else
                    >
                      <b-icon
                        pack="fas"
                        icon="plus"
                        size="is-small"
                        style="display: inline-block"
                      ></b-icon>
                      <span style="margin-left: 5px; display: inline-block"
                        >新增槍頭設備編號</span
                      ></b-button
                    >
                  </span> -->
                    <p>
                      <section>
                        <b-field >
                            <b-radio-button v-model="item.mstatus" @click.native="clickrb(2,item.sessionid)"
                                native-value="2"
                                type="is-danger is-light is-outlined"
                                v-permission="'clickrb'"
                                >
                                <template v-if="item.mstatus===2">
                                  <b-icon icon="check"></b-icon>
                                </template>
                                <!-- <b-icon icon="close"></b-icon> -->
                                <span>比賽結束</span>
                            </b-radio-button>

                            <b-radio-button v-model="item.mstatus"  @click.native="clickrb(1,item.sessionid)"
                                native-value="1"
                                type="is-success is-light is-outlined"
                                v-permission="'clickrb'"
                                >
                                <template v-if="item.mstatus===1">
                                  <b-icon icon="check"></b-icon>
                                </template>
                                <span>比賽開始</span>
                            </b-radio-button>

                            <b-radio-button v-model="item.mstatus" @click.native="clickrb(0,item.sessionid)"
                                native-value="0"
                                type="is-primary is-light is-outlined"
                                v-permission="'clickrb'">
                                <template v-if="item.mstatus===0">
                                  <b-icon icon="check"></b-icon>
                                </template>
                                <span>尚未開始</span>   
                            </b-radio-button>                              
                        </b-field>
                        <b-field >
                            <b-radio-button v-model="item.mstatus" @click.prevent.native=""
                                native-value="2"
                                type="is-danger is-light is-outlined"
                                v-permission="'childclickrb'"
                                >
                                <template v-if="item.mstatus===2">
                                  <b-icon icon="check"></b-icon>
                                </template>
                                <!-- <b-icon icon="close"></b-icon> -->
                                <span>比賽結束</span>
                            </b-radio-button>

                            <b-radio-button v-model="item.mstatus"  @click.prevent.native=""
                                native-value="1"
                                type="is-success is-light is-outlined"
                                v-permission="'childclickrb'"
                                >
                                <template v-if="item.mstatus===1">
                                  <b-icon icon="check"></b-icon>
                                </template>
                                <span>比賽開始</span>
                            </b-radio-button>

                            <b-radio-button v-model="item.mstatus" @click.prevent.native=""
                                native-value="0"
                                type="is-primary is-light is-outlined"
                                v-permission="'childclickrb'">
                                <template v-if="item.mstatus===0">
                                  <b-icon icon="check"></b-icon>
                                </template>
                                <span>尚未開始</span>   
                            </b-radio-button>                              
                        </b-field>
                        <!-- <p class="content">
                            <b>Selection:</b>
                            {{ radioButton }}
                        </p> -->
                    </section>
                      <!-- <span v-for="eitem in filterEquipmentDataMethod(item.sessionid)"
                      :key="eitem.sessionid"
                      > 
                      <span v-if="eitem.team=='Blue'" class="ssn">
                        藍方設備編號：{{ eitem.equipmentid }}
                      </span>                      
                      <span v-if="eitem.team=='Red'" class="ssn">
                        紅方設備編號：{{ eitem.equipmentid }}
                      </span>
                      <br />
                      </span> -->

                      <span class="ssn">
                        場次：{{ item.sessionname }}<br />
                      </span>
                      <span class="sst">
                        比賽時間：{{ item.sessiontime }}<br />
                      </span>
                      <span class="line"></span>
                      <span>
                        <span style="float: left">
                          <b-icon
                            pack="fas"
                            icon="user"
                            size="is-small"
                            type="is-info"
                          >
                          </b-icon>
                          藍方選手：{{ item.blue_account }}<br />
                        </span>
                        <span class="bas">
                          {{ item.bluefraction_sum }}<br />
                        </span>
                        <span style="margin-left: 225px">-</span>

                        <span style="float: right">
                          <b-icon
                            pack="fas"
                            icon="user"
                            size="is-small"
                            type="is-danger"
                          >
                          </b-icon>
                          紅方選手：{{ item.red_account }}<br />
                        </span>
                        <span class="ras">
                          {{ item.redfraction_sum }}<br />
                        </span> </span
                      ><br /><br />
                      <span>
                        <b-icon
                          pack="fas"
                          icon="user"
                          size="is-small"
                          type="is-success"
                        >
                        </b-icon>
                        裁判：{{ item.judge_account }} </span
                      ><br />
                      <span class="save-btn">
                        <b-button @click="Sessiondetail(item.sessionid)">
                          查看詳細比分
                          <!-- <font-awesome-icon icon="eye" size="lg" /> -->
                        </b-button>
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            </template>
          </b-table>       
        </div>
      </div>

      <div>
        <!-- <div class="save-btn">
          <button @click="showModal = true">Save</button>
        </div> -->
        <DetialModal
          v-if="showModal"
          @close-modal="showModal = false"
          v-bind:SessiondetailList="parSessiondetailList"
        />
        <!--新增比賽-->
        <CreateTournamentModal
          v-if="showTCreateModal"
          @close-modal="showTCreateModal = false"
        />
        <!--新增場次-->
        <CreateSessionModal
          v-if="showSCreateModal"
          @close-modal="showSCreateModal = false"
          v-bind:tournamentid="ParentTournamentid"
        />
        <!--新增場次-->
        <EditSessionModal
          v-if="showSEditModal"
          @close-modal="showSEditModal = false"
          v-bind:sessionid="Parentsessionid"
        />
        <!--新增編號-->
        <CreateEquipmentModal
          v-if="showETcreateModal"
          @close-modal="showETcreateModal = false"
          v-bind:sessionid="Parentsessionid"
        />
        <!--編輯編號-->
        <EditEquipmentModal
          v-if="showETEditModal"
          @close-modal="showETEditModal = false"
          :cparblue_equipmentid="parblue_equipmentid"
          :cparred_equipmentid="parred_equipmentid"
        />
        <TypefractionModal
          v-if="showTypefractionModal"
          @close-modal="showTypefractionModal = false"
          @reload="reload"
          :sessiondetialid="Parentsessiondetialid"
          :sessionid="Parentsessionid"
        />
      </div>
    </div>
  </keep-alive>
</template>


  <style>
.tile-content:before,
.tile-content:after {
  content: "";
  display: table;
}
.tile-content:after {
  clear: both;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
  font-size: 100%;
}
body {
  color: #414042;
  font-family: "Roboto", "Helvetica Neue", HelveticaNeue, Helvetica-Neue,
    Helvetica, -apple-system, BlinkMacSystemFont, BBAlpha Sans, "Segoe UI",
    Arial, "Noto Sans", sans-serif;
  margin: 0;
  padding: 0;
}
table {
  table-layout: fixed;
  border-collapse: collapse;
}
.ttzc-table-wrap {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
.ttzc-table {
  border: 2px solid #bcbec0;
  border-collapse: collapse;
  margin: 0 auto;
  max-width: 2000px;
  min-width: 851px;
  width: 100%;
}
.ttzc-table-title {
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  color: #2a3c68;
  text-align: left;
}
.ttzc-header {
  border-bottom: 2px solid #bcbec0;
  background-color: #2a3c68;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}
.ttzc-header {
  cursor: pointer;
  height: 85px;
  font-size: 20px;
  padding: 10px 0;
}
.ttzc-cell {
  text-align: center;
  width: 120px;
}
.ttzc-cell {
  padding: 7px;
}
.ttzc-row:not(:last-child) {
  border-bottom: 1px solid #bcbec0;
}
.ttzc-cell:first-child,
.ttzc-header:first-child {
  text-align: center;
  padding-left: 14px;
}
th {
  background-color: #2a3c68 !important;
  align-items: center !important;
}
.ttzc-row:nth-child(even) {
  background-color: #ededf6;
}
.ttzc-thead {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #2a3c68;
}
.tile {
  background-clip: padding-box;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #bcbec0;
  box-shadow: 4px 3px 20px #6d6e71;
  height: 800px;
  margin: 30px auto;
  padding: 0.75% 1.6%;
  scrollbar-face-color: #2a3c68;
  scrollbar-track-color: #4fa2d9;
  width: 85vw;
}
.tile::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.tile::-webkit-scrollbar-track {
  background: rgba(79, 162, 217, 0.5);
  border-radius: 5px;
  box-shadow: inset 0 0 5px white;
}
.tile::-webkit-scrollbar-thumb {
  background: rgba(42, 60, 104, 0.5);
  border-radius: 5px;
}
.tile::-webkit-scrollbar-thumb:hover {
  background: rgba(35, 50, 86, 0.8);
}
.tile::-webkit-scrollbar-thumb:active {
  background: rgba(27, 39, 68, 0.9);
  box-shadow: inset 0 0 5px white;
}
@media only screen and (min-width: 3800px) {
  .tile {
    width: 60vw;
  }
}
.tile-header {
  color: #2a3c68;
  font-family: "Lato", Verdana, Geneva, -apple-system, BlinkMacSystemFont,
    sans-serif;
  margin-bottom: 15px;
  text-transform: uppercase;
}
@media only screen and (min-width: 3800px) {
  .tile-header {
    text-align: center;
  }
}
.tile-content {
  height: 99%;
  margin: 0 auto;
  width: 90%;
}
.ttzc-tile {
  height: auto;
  padding-bottom: 25px;
}
@media only screen and (max-width: 1279px) {
  .ttzc-tile {
    overflow-x: auto;
  }
}
.ttzc-tbody {
  cursor: default;
}
.ttzc-tbody .ttzc-cell:nth-child(2) {
  text-align: right;
}
.ttzc-tbody .ttzc-row:hover {
  background-color: #4fa2d9;
}
.ttzc-tbody .ttzc-row:hover .ttzc-cell {
  color: #fff;
}
.ttzc-tfoot {
  background-color: #94a5b7;
  cursor: default;
  font-weight: 700;
}
.ttzc-tfoot:hover {
  background-color: #2a3c68;
}
.ttzc-tfoot:hover .ttzc-cell {
  color: #fff;
}
.ttzc-tfoot:hover .ttzc-cell:not(.ttzc-avgs):hover {
  color: #fce6a3;
}
.detail {
  background-color: #dbf6fd !important;
}
.media-content {
  text-align: initial !important;
}
/*比賽時間 */
.sst {
  color: #4a4a4a;
  opacity: 0.7;
  font-size: 18px;
  line-height: 16px;
}
/*場次 */
.ssn {
  color: #4a4a4a;
  opacity: 0.7;
  font-size: 18px;
  line-height: 16px;
}
.line {
  width: 100%;
  height: 2px;
  border-top: solid white;
}
.bas {
  margin-left: 250px;
  float: left;
  font-size: 25px;
}
.ras {
  margin-right: 250px;
  float: right;
  font-size: 25px;
}
.b-radio.radio.button.is-selected {
  z-index: 0 !important;
}
.th-wrap {
  justify-content: center;
}
</style>


<script>
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import DetialModal from "./views/DetialModal.vue";
import CreateTournamentModal from "./views/CreateTournament.vue";
import CreateSessionModal from "./views/CreateSession.vue";
import EditSessionModal from "./views/EditSession.vue";
import CreateEquipmentModal from "./views/CreateEquipment.vue";
import EditEquipmentModal from "./views/EditEquipment.vue";
import TypefractionModal from "./views/Typefraction.vue";
import music from "../assets/bellalert.wav";
import Swal from "sweetalert2";

export default {
  components: {
    DetialModal,
    CreateTournamentModal,
    CreateSessionModal,
    EditSessionModal,
    CreateEquipmentModal,
    EditEquipmentModal,
    TypefractionModal,
  },
  //inject: ["reload"], // 注入reload变量
  data() {
    return {
      isReloadData: true,
      tableClassList: [""],
      showModal: false,
      showTCreateModal: false,
      showSCreateModal: false,
      showSEditModal: false,
      showETcreateModal: false,
      showETEditModal: false,
      showTypefractionModal: false,
      listData: [],
      SessionData: [],
      EquipmentData: [],
      TempData: {},
      parSessiondetailList: [],
      parEquipmentList: [],
      parblue_equipmentid: "",
      parred_equipmentid: "",
      Parentsessionid: null,
      ParentTournamentid: null,
      Parentsessiondetialid: "",
      //舊的 防止重複抓取
      oldsessiondetialid: "",

      //比賽狀態
      radioButton: "",
      columns: [
        // {
        //   field: "tournamentid",
        //   label: "ID",
        //   width: "40",
        //   numeric: true,
        // },
        {
          class: "ttzc-header",
          field: "tournamentname",
          label: "比賽名稱",
          centered: true,
        },
        {
          class: "ttzc-header",
          field: "tournamentdate",
          label: "比賽日期",
          centered: true,
        },
      ],
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    //取得比賽列表
    async GetAPIData() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Tournament/GetTournament", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.listData = response.data.Data;
            this.GetSessionForWeb();
            this.GetAllEquipmentsetting();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
    closeModal() {
      this.showModal = false;
    },
    Sessiondetail(sessionid) {
      this.showModal = true;
      this.Parentsessionid = sessionid;
      this.GetSessiondetail();
    },
    //取得場次資訊
    GetSessionForWeb() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Pikegame/Session/GetSessionForWeb", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.SessionData = response.data.Data.slice();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //取得設備編號
    GetAllEquipmentsetting() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(url + "/Pikegame/Equipmentsetting/GetAllEquipmentsetting", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.EquipmentData = response.data.Data.slice();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //新增比賽
    CreateTournament() {
      this.showTCreateModal = true;
    },
    //新增場次
    CreateSession(tournamentid) {
      this.showSCreateModal = true;
      this.ParentTournamentid = tournamentid;
    },
    //編輯場次
    EditSession(sessionid) {
      this.showSEditModal = true;
      this.Parentsessionid = sessionid;
    },
    //修改比賽狀態
    async SetSessionmstatus(mstatus, mstatusname, sessionid) {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Session/SetSessionmstatus", {
          mstatus: mstatus,
          sessionid: sessionid,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            Swal.fire("已修改!", `比賽狀態已修改為${mstatusname}`, "success");
            this.reload();
          } else {
            this.error = response.data.Message;
            Swal.fire("修改失敗!", `${this.error}`, "error");
            this.reload();
          }
        })
        .catch((error) => console.log(error));
    },
    //新增設備編號
    CreateEquipment(sessionid) {
      this.showETcreateModal = true;
      this.Parentsessionid = sessionid;
    },
    //編輯設備編號
    EditEquipment(sessionid) {
      this.Parentsessionid = sessionid;
      this.GetEquipment();
    },
    //取得分數詳細
    GetSessiondetail() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Pikegame/Sessiondetial/GetSessiondetail",
          this.Parentsessionid
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.parSessiondetailList = response.data.Data.slice();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //取得設備編號
    async GetEquipment() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(
          url + "/Pikegame/Equipmentsetting/GetEquipmentsetting",
          this.Parentsessionid
        )
        .then((response) => {
          if (response.data.isSuccess == true) {
            this.parEquipmentList = response.data.Data.slice();

            if (this.parEquipmentList != []) {
              this.parblue_equipmentid = this.parEquipmentList[0].equipmentid;
              this.parred_equipmentid = this.parEquipmentList[1].equipmentid;

              this.loading = false;
              this.showETEditModal = true;
            }
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    handleReload() {
      this.reload(); //在这里可直接调用 ，一般用在新增一条数据，或者删除了一条数据，需要刷新当前页面的时候
    },
    showDetail(id) {
      this.$buefy.toast.open({
        // indefinite: true,
        message: `${id}`,
        type: "is-warning",
      });
    },
    //table td 格式
    columnTdAttrs() {
      return {
        // colspan: 10,
        //class: 'has-text-weight-bold ttzc-header',
        class: "has-text-weight-bold ",
        // style: {
        //   "text-align": "center !important",
        // },
      };
    },
    //table th 格式
    columnThAttrs() {
      return {
        class: "ttzc-header ",
        style: {
          "text-align": "center !important",
          color: "white",
        },
      };
    },
    //過濾場次資料
    filterSessionDataMethod(tid) {
      var arr = this.SessionData.filter(function (element) {
        return element.tournamentid == tid;
      });

      return arr;
    },
    //過濾設備編號
    filterEquipmentDataMethod(sid) {
      var arr = this.EquipmentData.filter(function (element) {
        return element.sessionid == sid;
      });

      return arr;
    },

    reload() {
      this.showTypefractionModal = false;
      this.GetAPIData();

      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    },
    //Websockt
    initWebSocket() {
      //初始化weosocket
      //wss://localhost:44301/api/NotifyWebSocket
      //var accountid = sessionStorage.getItem('accountid');
      //const wsuri = "wss://localhost:44302/api/NotifyWebSocket";
      const wsuri = "wss://www.hungminginfo.com/pikegame_API/api/NotifyWebSocket";
      this.websock = new WebSocket(wsuri);
      // 客户端接收服务端数据时触发
      this.websock.onmessage = this.websocketonmessage;
      // 连接建立时触发
      this.websock.onopen = this.websocketonopen;
      // 通信发生错误时触发
      this.websock.onerror = this.websocketonerror;
      // 连接关闭时触发
      this.websock.onclose = this.websocketclose;
    },
    // 连接建立时触发
    websocketonopen() {
      //开启心跳
      //this.start();
      var accountid = sessionStorage.getItem("accountid");

      this.websocketsend(JSON.parse(accountid));

      //连接建立之后执行send方法发送数据
      // let actions = {"room":"007854ce7b93476487c7ca8826d17eba","info":"1121212"};
      // this.websocketsend(JSON.stringify(actions));
    },
    // 通信发生错误时触发
    websocketonerror() {
      console.log("出现错误");
      this.reconnect();
    },
    // 客户端接收服务端数据时触发
    websocketonmessage(e) {
      var str = e.data;
      str = str.split("_");
      var team = str[0];
      var result = str[1];
      var sessiondetialid = str[2];
      var sessionid = str[3];

      if (this.oldsessiondetialid != sessiondetialid) {
        this.oldsessiondetialid = sessiondetialid;
        this.Parentsessiondetialid = this.oldsessiondetialid;
        this.Parentsessionid = sessionid;
        if (team == "Red") {
          this.btn();
          this.showTypefractionModal = true;
        } else if (team == "Blue") {
          this.btn();
          this.showTypefractionModal = true;
        } else {
          //收到服务器信息，心跳重置 2022/11/04 開啟才會有心跳
          //this.reset();
        }
      } else {
        console.log(this.oldsessiondetialid);
      }

      console.log("team" + team);
      console.log("result" + result);

      //收到服务器信息，心跳重置 2022/11/04 開啟才會有心跳 (測試會先關閉)
      this.reset();
    },
    websocketsend(Data) {
      this.websock.send(Data); //这里可以自己跟后端约定
    },
    // 连接关闭时触发
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
      //重连
      this.reconnect();
    },
    reconnect() {
      //重新连接
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        //新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    start() {
      //开启心跳
      console.log("開啟心跳");

      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        console.log(self.websock);
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState == 1) {
          self.websock.send("heartCheck");
          //如果连接正常
          // var accountid = sessionStorage.getItem('accountid');

          //  self.websock.send(JSON.parse(accountid)); //这里可以自己跟后端约定
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          //超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    //測試鈴聲
    btn() {
      // this.open = true ;
      // this.ring = true;
      const audio = new Audio(music);

      audio.addEventListener("canplaythrough", () => {
        audio.play();
      });
    },
    //切換比賽狀態
    clickrb(mstatus, sessionid) {
      var mstatusname = "";
      switch (mstatus) {
        case 0: //尚未比賽狀態
          mstatusname = "尚未比賽狀態";
          break;
        case 1: //比賽開始狀態
          mstatusname = "比賽開始狀態";
          break;
        case 2: //比賽結束狀態
          mstatusname = "比賽結束狀態";
          break;
      }

      Swal.fire({
        title: `確定要修改嗎?`,
        text: `確定要修改為${mstatusname}嗎?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是的!我要修改",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.SetSessionmstatus(mstatus, mstatusname, sessionid);
        } else {
          this.reload();
        }
      });
    },
  },
  mounted() {
    this.GetAPIData();
  },
  created() {
    this.$emit("publuc_header", true);
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
};
</script>