<template>
    <div class="tile ttzc-tile">
      <div class="tile-content">
        <div class="ttzc-table-wrap">
          <b-button
            style="float: right; margin-bottom: 10px; z-index: 1"
            type="is-primary is-light"
            @click="CreateAccountm()"
            v-permission="'CreateAccountm'"
            >新增使用者</b-button
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
              field="modifydate"
              label="修改日期"
              :td-attrs="columnTdAttrs"
              :th-attrs="columnThAttrs"
              v-slot="props"
            >
              {{ props.row.modifydate }}
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
  import axios from "axios"; 
  import CreateAccountmModal from "./views/CreateAccountm.vue";
  import EditAccountmModal from "./views/EditAccountm.vue";
  //import Swal from 'sweetalert2'
  
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
        AdlistData: [],
        showACreateModal: false,
        showAEditModal: false,
        Parentaccountid: "",        
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
        const date = new Date(dateString);
        // Then specify how you want your dates to be formatted
        return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
          date
        );
      },      
      //新增使用者
      EditAccountm(accountid) {
        this.showAEditModal = true;
        this.Parentaccountid = accountid;
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