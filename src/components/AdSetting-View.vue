<template>
  <div class="tile ttzc-tile">
    <div class="tile-content">
      <div class="ttzc-table-wrap row">
        <b-button
          style="float: right; margin-bottom: 10px;"
          type="is-primary is-light"
          @click="CreateAd()"
          v-permission="'CreateAd'"
          >新增廣告</b-button
        >
        <b-table
          id="AdlistData"
          :data="AdlistData"
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
            field="advertiseurl"
            label="廣告路徑"
            :th-attrs="columnThAttrs"
            :td-attrs="columnTdAttrs"
            v-slot="props"
          >
            {{ props.row.advertiseurl }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="advertisstarttime"
            label="下廣告時間起"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.advertisstarttime }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="advertisendtime"
            label="下廣告時間迄"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.advertisendtime }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="advertistimeperiod"
            label="播放時段"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.advertistimeperiod }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="advertisetitle"
            label="廣告標題"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.advertisetitle }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="advertisedescription"
            label="廣告描述"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.advertisedescription }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="advertiscosts"
            label="廣告費用"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.advertiscosts }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="adsstatus"
            label="狀態"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.adsstatus }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="modifydate"
            label="修改日期"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ formatDate(props.row.modifydate) }}
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
              @click="EditAd(props.row.advertiseid)"
              type="is-info is-light"
              v-permission="'EditAd'"
            >
              <b-icon
                pack="fas"
                icon="edit"
                size="is-medium"
                style="display: inline-block"
                type="is-success"
              ></b-icon>
             </b-button>
            <b-button
              @click="DeleteAd(props.row.advertiseid)"
              type="is-info is-light"
              style="margin-left: 5px"
              v-permission="'DeleteAd'"
            >
              <b-icon
                pack="fas"
                icon="trash"
                size="is-medium"
                style="display: inline-block"
                type="is-danger"
              ></b-icon>
              </b-button>           
          </b-table-column>
        </b-table>
      </div>
    </div>
    <!--新增使用者-->
    <CreateAdvertiseModal
      v-if="showAdCreateModal"
      @close-modal="showAdCreateModal = false"
      @reload="reload"
    />
    <!--編輯-->
    <EditAdvertiseModal
      v-if="showAdeditModal"
      @close-modal="showAdeditModal = false"
      @reload="reload"
      :advertiseid="Parentadvertiseid"
    />
    <div></div>
  </div>
</template>
  
  
  
  <script>
import axios from "axios";
import CreateAdvertiseModal from "./views/CreateAdvertise.vue";
import EditAdvertiseModal from "./views/EditAdvertise.vue";
import Swal from "sweetalert2";

export default {
  components: {
    CreateAdvertiseModal,
    EditAdvertiseModal,
  },
  //inject: ["reload"], // 注入reload变量
  data() {
    return {
      isReloadData: true,
      tableClassList: [""],
      AdlistData: [],
      showAdCreateModal: false,
      showAdeditModal: false,
      Parentadvertiseid: "",
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    async GetAdvertisesetting() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Advertisesetting/GetAdvertisesetting", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.AdlistData = response.data.Data;
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    formatDate(dateString) {
      var date = new Date(dateString);
      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join("-") +
        " " +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
          this.padTo2Digits(date.getSeconds()),
        ].join(":")
      );
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    //新增廣告
    CreateAd() {
      this.showAdCreateModal = true;
    },

    //新增廣告
    EditAd(advertiseid) {
      this.showAdeditModal = true;
      this.Parentadvertiseid = advertiseid;
    },
    //刪除廣告
    async DeleteAdvertiseAPI(advertiseid) {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(
          url + "/Pikegame/Advertisesetting/DeleteAdvertise",
          JSON.stringify(advertiseid)
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            Swal.fire("已刪除!", `該輪播圖片已被刪除`, "success");
            this.reload();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //刪除廣告 sweetalert
    DeleteAd(advertiseid) {
      Swal.fire({
        title: "確定要刪除嗎?",
        text: "刪除可能影響廣告輪播呈現!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是的!我要刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.DeleteAdvertiseAPI(advertiseid);
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
          "text-align": "center !important;width:35px!important;",
          color: "white",
        },
      };
    },
    reload() {
      this.showAdCreateModal = false;
      this.showAdeditModal = false;
      this.GetAdvertisesetting();

      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    },
  },
  mounted() {
    this.GetAdvertisesetting();
  },
};
</script>
  <style >
.tile {
  width: 90vw;
}
/* nav {
    z-index: 1;
    position: inherit;
    right: 0;
  } */
</style>