<template>
  <keep-alive v-if="isReloadData">
  <div class="tile ttzc-tile">
    <div class="tile-content">
      <div class="ttzc-table-wrap">
        <b-button
          style="float: right; margin-bottom: 10px; z-index: 1"
          @click="CreateTournament()"
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
            <b-button @click="CreateSession(props.row.tournamentid)">
              <b-icon
                pack="fas"
                icon="plus"
                size="is-large"
                style="display:inline-block"
                type="is-success"               
              ></b-icon>
              <span style="margin-left:5px;display:inline-block">新增場次</span></b-button
            >
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
                  <p>
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
                      <span
                        style="margin-left: 250px; float: left; font-size: 25px"
                      >
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
                      <span
                        style="margin-right: 250px;float: right;font-size: 25px;"
                      >
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
        <!-- <table class="ttzc-table" id="ttzc_table">
          <caption>          
          </caption>
          <colgroup>
            <col class="col-zip" />
            <col class="col-city" />
            <col class="col-state" />
            <col class="col-pcentvis" />
            <col class="col-cumpcentvis" />
            <col class="col-tothouse" />
            <col class="col-totpop" />
          </colgroup>
          <thead class="ttzc-thead">
            <tr class="ttzc-row">
              <th
                class="ttzc-header"
                scope="col"
                title="Click to sort numerically"
              >
                
              </th>
              <th
                class="ttzc-header"
                scope="col"
                title="Click to sort numerically"
              >
                比賽名稱
              </th>
              <th
                class="ttzc-header ttzc-city"
                scope="col"
                title="Click to sort alphabetically"
              >
                時間
              </th>
              <th
                class="ttzc-header ttzc-state"
                scope="col"
                title="Click to sort alphabetically"
              >
                場次
              </th>
              <th
                class="ttzc-header ttzc-pcentvis"
                scope="col"
                title="Click to sort numerically"
              >
                藍方
              </th>
              <th
                class="ttzc-header ttzc-cumpcentvis"
                scope="col"
                title="Click to sort numerically"
              >
                紅方
              </th>
              <th
                class="ttzc-header ttzc-tothouse"
                scope="col"
                title="Click to sort numerically"
              >
                裁判
              </th>
              <th
                class="ttzc-header ttzc-totpop"
                scope="col"
                title="Click to sort numerically"
              >
                <i class="fa-solid fa-eye"></i>
              </th>
            </tr>
          </thead>
          <tbody class="ttzc-tbody">
            <tr
              class="ttzc-row"
              v-for="item in listData"
              :key="item.tournamentid"
            >
              <td> <button onclick="showDetailId=item.tournamentid">+</button></td>
              <td class="ttzc-cell">{{ item.tournamentname }}</td>
              <td class="ttzc-cell ttzc-city">
                {{ formatDate(item.tournamentstartdate) }}~<br />{{
                  formatDate(item.tournamentenddate)
                }}
              </td>
              <td class="ttzc-cell ttzc-state">{{ item.sessionname }}</td>
              <td class="ttzc-cell ttzc-pcentvis">{{ item.blue_account }}</td>
              <td class="ttzc-cell ttzc-cumpcentvis">{{ item.red_account }}</td>
              <td class="ttzc-cell ttzc-tothouse">{{ item.jugde }}</td>
              <td class="ttzc-cell ttzc-totpop">
                <div>
                  <div class="save-btn">                    
                    <b-button @click="Sessiondetail(item.sessionid)">
                      <font-awesome-icon icon="eye" size="lg" />
                    </b-button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>         
        </table> -->
      </div>
    </div>

    <div>
      <!-- <div class="save-btn">
          <button @click="showModal = true">Save</button>
        </div> -->
      <DetialModal
        v-show="showModal"
        @close-modal="showModal = false"
        v-bind:SessiondetailList="parSessiondetailList"
      />
      <CreateTournamentModal
        v-show="showTCreateModal"
        @close-modal="showTCreateModal = false"
      />
      <CreateSessionModal
        v-show="showSCreateModal"
        @close-modal="showSCreateModal = false"
        v-bind:tournamentid="ParentTournamentid"
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
.mockup-header {
  margin-top: 100px;
  text-align: center;
}
.ttzc-table-wrap {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
.age-row {
  vertical-align: top;
}
.avgage {
  margin-top: 10px;
}
.divcell {
  padding: 0;
  margin-bottom: 5px;
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
.cell-empty {
  color: transparent;
}
.bench-name,
.comp-name {
  width: 120px;
  margin: 0 auto;
  word-wrap: normal;
}
.ttzc-cell:first-child,
.ttzc-header:first-child {
  text-align: left;
  padding-left: 14px;
}
th {
  background-color: #2a3c68 !important;
}
.col-zip {
  max-width: 120px;
  min-width: 120px;
  width: 120px;
}
.ttzc-city {
  text-align: right !important;
  padding-right: 5px !important;
}
.ttzc-popgrow {
  text-align: right !important;
  padding-right: 14px !important;
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
.ttzc-avgs {
  font-variant: small-caps;
  letter-spacing: 2px;
}
col-zip {
  border-right: 2px solid black !important;
}
.detail {
  background-color: #dbf6fd !important;
}
.media-content {
  text-align: initial !important;
}
.sst {
  color: #4a4a4a;
  opacity: 0.7;
  font-size: 18px;
  line-height: 16px;
}
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
</style>


<script>
/**
 * @name makeAllSortable
 * @description Makes the specified tables sortable. If no arguments are passed
 * it will make all tables on the page it is run on sortable.
 * @param {string} [tableClass] - Class name for the table or tables you want to
 * be sortable. If undefined function will instead look for all table elements
 * @param {HTMLElement} [parent=document.body] - The parent element of the tables
 * specified in the tableClass argument
 */
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import DetialModal from "./views/DetialModal.vue";
import CreateTournamentModal from "./views/CreateTournament.vue";
import CreateSessionModal from "./views/CreateSession.vue";

export default {
  components: { DetialModal, CreateTournamentModal, CreateSessionModal },
  inject: ["reload"], // 注入reload变量
  data() {
    return {
      isReloadData: true, 
      tableClassList: [""],
      showModal: false,
      showTCreateModal: false,
      showSCreateModal: false,
      listData: [],
      SessionData: [],
      TempData: {},
      parSessiondetailList: [],
      Parentsessionid: null,
      ParentTournamentid: null,
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
      reload: this.reload
    };
  },    
  methods: {
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
            console.log(this.SessionData);
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
        style: {
          "text-align": "center !important",
        },
      };
    },
    //table th 格式
    columnThAttrs() {
      return {
        class: "ttzc-header",
        style: {
          "text-align": "center !important;width:50px!important;",
          color: "white",
        },
      };
    },
    //過濾場次資料
    filterSessionDataMethod(tid) {
      var arr = this.SessionData.filter(function (element) {
        return element.tournamentid == tid;
      });
      console.log(arr);
      return arr;
    },
    reload() {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    }
  },
  mounted() {
    const url = this.GLOBAL.ApiUrl;
    axios
      .post(url + "/Pikegame/Tournament/GetTournament", {})
      .then((response) => {
        this.loading = false;
        if (response.data.isSuccess == true) {
          this.listData = response.data.Data;
          this.GetSessionForWeb();
          console.log(this.listData);
        } else {
          this.error = response.data.Message;
        }
      })
      .catch((error) => console.log(error));
  },
};

function makeAllSortable(tableClass, parent) {
  parent = document.getElementById(parent) || document.body;

  const table =
    typeof tableClass !== "undefined"
      ? parent.getElementsByClassName(tableClass)
      : parent.getElementsByTagName("table");

  let numTables = table.length;

  // Run through every table on the page and make them all sortable
  while (--numTables >= 0) {
    makeSortable(table[numTables]);
  }

  /**
   * @name fixComparison
   * @description Fixes to values for comparison in sortTable
   *
   * @param {string} a - First item being compared
   * @param {string} b - Second item being compared
   * @return {string[]} The adjusted a and b fixed for comparison
   */
  function fixComparison(a, b) {
    let diff;

    if (a.length !== b.length) {
      if (a.length > b.length) {
        diff = a.length - b.length;
        for (let k = 0; k < diff; k++) {
          b = "0" + b;
        }
      } else {
        diff = b.length - a.length;
        for (let k = 0; k < diff; k++) {
          a = "0" + a;
        }
      }
    }

    return [a, b];
  }

  /**
   * @name sortTable
   * @description Takes a given table and column, as well as whether or not the
   * column has already been reversed, as input, and then sorts the table column
   *
   * @param {HTMLElement} table
   * @param {HTMLElement} col
   * @param {number} reverse - 1 for true 0 for false
   * @todo Refactor logic for optimization & implement a datetime sorting solution
   */
  function sortTable(table, col, reverse) {
    const T_BODY = table.tBodies[0], // ignore `<thead>` and `<tfoot>` rows
      IS_NUM = /^[0-9]*\.?[0-9]+$/;

    let tRows = Array.prototype.slice.call(T_BODY.rows, 0); // Put rows into array

    reverse = -(+reverse || -1);

    tRows = tRows.sort(function (a, b) {
      // Sort rows
      let tempA = a.cells[col].textContent.trim(),
        tempB = b.cells[col].textContent.trim();

      if (tempA.slice(-1) === "%" || tempB.slice(-1) === "%") {
        if (tempA.slice(-1) === "%") {
          tempA = tempA.slice(0, tempA.length - 1);
        }
        if (tempB.slice(-1) === "%") {
          tempB = tempB.slice(0, tempB.length - 1);
        }
        [tempA, tempB] = fixComparison(tempA, tempB);
      } else if (tempA.substr(0, 1) === "$" || tempB.substr(0, 1) === "$") {
        if (tempA.substr(0, 1) === "$") {
          tempA = tempA.slice(1, tempA.length);
        }
        if (tempB.substr(0, 1) === "$") {
          tempB = tempB.slice(1, tempB.length);
        }
        [tempA, tempB] = fixComparison(tempA, tempB);
      } else if (
        IS_NUM.test(stripCommas(tempA)) ||
        IS_NUM.test(stripCommas(tempB))
      ) {
        if (IS_NUM.test(stripCommas(tempA))) {
          tempA = stripCommas(tempA) + "";
        }
        if (IS_NUM.test(stripCommas(tempB))) {
          tempB = stripCommas(tempB) + "";
        }
        [tempA, tempB] = fixComparison(tempA, tempB);
      }

      return reverse * tempA.localeCompare(tempB);
    });

    for (let i = 0; i < tRows.length; ++i) {
      T_BODY.appendChild(tRows[i]); // append each row in order
    }
  }

  /**
   * @name makeSortable
   * @description Makes a table sortable
   *
   * @param {HTMLElement} table - The table being sorted
   */
  function makeSortable(table) {
    let th = table.tHead,
      i;

    th && (th = th.rows[0]) && (th = th.cells);

    if (th) {
      i = th.length;
    } else {
      return; // if no `<thead>` then do nothing
    }

    while (--i >= 0) {
      (function (i) {
        var dir = 1;
        th[i].addEventListener("click", function () {
          sortTable(table, i, (dir = 1 - dir));
        });
      })(i);
    }
  }
}

/**
 * @name stripCommas
 * @description Takes a string of a number with commas in it and strips the
 * commas out of the string, returning the number value.
 *
 * @param {string} x - A string representing a number that is displayed with
 * commas
 *
 * @return {number} The number value of the string with the commas
 * stripped
 */
function stripCommas(x) {
  return (x + "").replace(/,/g, "") * 1;
}

window.onload = function () {
  makeAllSortable();
  // Could also be makeAllSortable('ttzc-table', 'ttzc-tile')
  // if I just wanted the tables with that class inside that element)
};
</script>