<template>
  <div class="tile ttzc-tile">
    <div class="tile-content">
      <div class="ttzc-table-wrap row">
        <b-button
          style="float: right; margin-bottom: 10px"
          type="is-primary is-light"
          @click="CreateVideo()"
          v-permission="'CreateVideo'"
          >新增影片</b-button
        >
        <b-table
          id="videolistData"
          :data="videolistData"
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
            field="videourl"
            label="影片路徑"
            :th-attrs="columnThAttrs"
            :td-attrs="columnTdAttrs"
            v-slot="props"
          >
            {{ props.row.videourl }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="videotitle"
            label="影片標題"
            :th-attrs="columnThAttrs"
            :td-attrs="columnTdAttrs"
            v-slot="props"
          >
            {{ props.row.videotitle }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="videodescription"
            label="影片描述"
            :th-attrs="columnThAttrs"
            :td-attrs="columnTdAttrs"
            v-slot="props"
          >
            {{ props.row.videodescription }}
          </b-table-column>
          <b-table-column
            class="th-wrap is-centered"
            field="videostatus"
            label="狀態"
            :td-attrs="columnTdAttrs"
            :th-attrs="columnThAttrs"
            v-slot="props"
          >
            {{ props.row.videostatus }}
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
              @click="EditVideo(props.row.videoid)"
              type="is-info is-light"
              v-permission="'EditVideo'"
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
              @click="DeleteVideo(props.row.videoid)"
              type="is-info is-light"
              style="margin-left: 5px"
              v-permission="'DeleteVideo'"
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
    <!--新增-->
    <CreateVideoModal
      v-if="showVideoCreateModal"
      @close-modal="showVideoCreateModal = false"
      @reload="reload"
    />
    <!--編輯-->
    <EditVideoModal
      v-if="showVideoeditModal"
      @close-modal="showVideoeditModal = false"
      @reload="reload"
      :videoid="Parentvideoid"
    />
    <div></div>
  </div>
</template>
  
  
  
  <script>
import axios from "axios";
import CreateVideoModal from "./views/CreateVideo.vue";
import EditVideoModal from "./views/EditVideo.vue";
import Swal from "sweetalert2";

export default {
  components: {
    CreateVideoModal,
    EditVideoModal,
  },
  //inject: ["reload"], // 注入reload变量
  data() {
    return {
      isReloadData: true,
      tableClassList: [""],
      videolistData: [],
      showVideoCreateModal: false,
      showVideoeditModal: false,
      Parentvideoid: "",
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    async GetVideosetting() {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(url + "/Pikegame/Videosetting/GetVideosetting", {})
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.videolistData = response.data.Data;
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
    //新增影片
    CreateVideo() {
      this.showVideoCreateModal = true;
    },

    //編輯影片
    EditVideo(videoid) {
      this.showVideoeditModal = true;
      this.Parentvideoid = videoid;
    },
    //刪除影片
    async DeleteVideoAPI(videoid) {
      const url = this.GLOBAL.ApiUrl;
      await axios
        .post(
          url + "/Pikegame/Videosetting/DeleteVideo",
          JSON.stringify(videoid)
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            Swal.fire("已刪除!", `該影片已被刪除`, "success");
            this.reload();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //刪除影片 sweetalert
    DeleteVideo(videoid) {
      Swal.fire({
        title: "確定要刪除嗎?",
        text: "刪除可能影響影片呈現!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是的!我要刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.DeleteVideoAPI(videoid);
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
      this.showVideoCreateModal = false;
      this.showVideoeditModal = false;
      this.GetVideosetting();

      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    },
  },
  mounted() {
    this.GetVideosetting();
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