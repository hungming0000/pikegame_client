<template>
  <div class="tile ttzc-tile">
    <div class="tile-content">
      <div class="ttzc-table-wrap">
        <b-button
          style="float: right; margin-bottom: 10px; "
          type="is-primary is-light"
          @click="CreateAccountm()"
          v-permission="'CreateAccountm'"
          >新增使用者</b-button
        >
        <b-table
          id="Accountmlisttable"
          :data="AccountmlistData"
          :class="tableClassList"
          ref="table"
          paginated
          per-page="8"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          striped
          hoverable
        >
          <b-table-column
            class="th-wrap is-centered"
            field="accountid"
            label="帳號"
            :th-attrs="columnThAttrs"
            :td-attrs="columnTdAttrs"
            v-slot="props"
          >
            {{ props.row.accountid }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="accountname"
            label="使用者名稱"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.accountname }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="accountgroupname"
            label="帳號類型"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.accountgroupname }}
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
              @click="EditAccountm(props.row.accountid)"
              type="is-info is-light"
              v-permission="'EditAccountm'"
            >
              <b-icon
                pack="fas"
                icon="edit"
                size="is-medium"
                style="display: inline-block"
                type="is-success"
              ></b-icon>
              <span style="margin-left: 5px; display: inline-block"
                >編輯使用者</span
              ></b-button
            >
            <b-button
              @click="DeleteAccountm(props.row.accountid)"
              type="is-info is-light"
              style="margin-left:5px"
              v-permission="'DeleteAccountm'"
            >
            <b-icon
                pack="fas"
                icon="trash"
                size="is-medium"
                style="display: inline-block"
                type="is-danger"
              ></b-icon>
              <span style="margin-left: 5px; display: inline-block"
                >刪除</span
              ></b-button
            >
            <div class="nav">
              <!-- <b-button @click="btn">提示音</b-button> -->
              <!-- <easy-ring :open="open" :ring="ring" :src="music" /> -->
            </div>
          </b-table-column>
        </b-table>
      </div>
    </div>
    <!--新增使用者-->
    <CreateAccountmModal
      v-if="showACreateModal"
      @close-modal="showACreateModal = false"
      @reload="reload"
    />
    <!--編輯-->
    <EditAccountmModal
      v-if="showAEditModal"
      @close-modal="showAEditModal = false"
      @reload="reload"
      v-bind:Paccountid="Parentaccountid"
    />
    <div></div>
  </div>
</template>



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
import CreateAccountmModal from "./views/CreateAccountm.vue";
import EditAccountmModal from "./views/EditAccountm.vue";
import Swal from 'sweetalert2'

export default {
  components: {
    CreateAccountmModal,
    EditAccountmModal,
  },
  //inject: ["reload"], // 注入reload变量
  data() {
    return {
      isReloadData: true,
      tableClassList: [""],
      AccountmlistData: [],
      showACreateModal: false,
      showAEditModal: false,
      Parentaccountid: "",
      columns: [
        {
          class: "ttzc-header",
          field: "accountid",
          label: "帳號",
          centered: true,
        },
        {
          class: "ttzc-header",
          field: "accountname",
          label: "使用者名稱",
          centered: true,
        },
        {
          class: "ttzc-header",
          field: "accountgroupname",
          label: "帳號類型",
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
    async GetAPIData() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Accountm/GetAccountm", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.AccountmlistData = response.data.Data;
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
    //新增使用者
    CreateAccountm() {
      this.showACreateModal = true;
    },
    //編輯使用者
    EditAccountm(accountid) {
      this.showAEditModal = true;
      this.Parentaccountid = accountid;
    },
    //刪除使用者
    async DeleteAccountmAPI(accountid){
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Accountm/DeleteAccountmById",JSON.stringify(accountid) )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            Swal.fire("已刪除!", `該帳號${accountid}已被刪除`, "success");
            this.reload();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //刪除使用者 sweetalert
    DeleteAccountm(accountid) {
      Swal.fire({
        title: "確定要刪除嗎?",
        text: "刪除可能影響賽局呈現!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是的!我要刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
            this.DeleteAccountmAPI(accountid);         
        }
      });
    },

    handleReload() {
      this.reload(); //在这里可直接调用 ，一般用在新增一条数据，或者删除了一条数据，需要刷新当前页面的时候
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
    reload() {
      this.showACreateModal = false;
      this.showAEditModal = false;
      this.GetAPIData();

      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    },
  },
  mounted() {
    this.GetAPIData();
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
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