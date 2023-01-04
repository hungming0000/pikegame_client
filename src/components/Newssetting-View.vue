<template>
  <div class="tile ttzc-tile">
    <div class="tile-content">
      <div class="ttzc-table-wrap row">   
        <b-button v-if="NewsData.length==0"
          style="float: right; margin-bottom: 10px"
          type="is-primary is-light"
          @click="CreateNews()"
          v-permission="'CreateNews'"
          >新增最新消息</b-button
        >    
        <b-table
          id="NewsData"
          :data="NewsData"
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
            field="newsdescription"
            label="最新消息描述"
            :th-attrs="columnThAttrs"
            :td-attrs="columnTdAttrs"
            v-slot="props"
          >
            {{ props.row.newsdescription }}
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
              @click="EditNews(props.row.newsid)"
              type="is-info is-light"
              v-permission="'EditNews'"
            >
              <b-icon
                pack="fas"
                icon="edit"
                size="is-medium"
                style="display: inline-block"
                type="is-success"
              ></b-icon>
             </b-button>                 
          </b-table-column>
        </b-table>
      </div>
    </div>   
    <!--新增-->
    <CreateNewsModal
      v-if="showNewscreateModal"
      @close-modal="showNewscreateModal = false"
      @reload="reload"
    />
    <!--編輯-->
    <EditNewsModal
      v-if="showNewseditModal"
      @close-modal="showNewseditModal = false"
      @reload="reload"
      :newsid="Parentnewsid"
    />
    <div></div>
  </div>
</template>
  
  
  
  <script>
import axios from "axios";
import CreateNewsModal from "./views/CreateNews.vue";
import EditNewsModal from "./views/EditNews.vue";

export default {
  components: {    
    EditNewsModal,
    CreateNewsModal,
  },
  //inject: ["reload"], // 注入reload变量
  data() {
    return {
      isReloadData: true,
      NewsData:[],
      tableClassList: [""],      
      showNewscreateModal: false,
      showNewseditModal: false,
      Parentnewsid: "",
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    async GetNewssetting() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Newssetting/GetNewssetting", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.NewsData = response.data.Data;
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
    //新增最新消息
    CreateNews() {
      this.showNewscreateModal = true;      
    }, 
    //編輯最新消息
    EditNews(newsid) {
      this.showNewseditModal = true;
      this.Parentnewsid = newsid;
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
      this.showNewseditModal = false;
      this.showNewscreateModal= false;
      this.GetNewssetting();

      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    },
  },
  mounted() {
    this.GetNewssetting();
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