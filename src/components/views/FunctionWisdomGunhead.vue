
  <template>
  <div id="cardtable" class="container">
    <section>
      <section>
        <b-field>
          <b-button
            label="Clear selected"
            type="is-danger"
            icon-left="close"
            :disabled="!selected"
            @click="selected = null"
          />
        </b-field>

        <b-tabs>
          <b-tab-item label="Table">
            <b-table
              :data="EquipmentidList"
              :columns="columns"
              :selected.sync="selected"
              focusable
            >
            </b-table>
          </b-tab-item>

          <b-tab-item label="Selected">
            <pre>{{ selected }}</pre>
          </b-tab-item>
        </b-tabs>
      </section>

      <!-- <b-field style="width:50%;margin-left: 25%">
              <b-select
                placeholder="請選擇設備編號"
                v-model="equipmentid"                
                required
                expanded
              >
                <option
                  v-for="item in GetEquipmentidList"
                  :value="item.accountid"
                  :key="item.accountid"
                >
                  {{ item.accountname }}
                </option>
              </b-select>
            </b-field>      -->
      <div class="card" aria-id="contentIdForA11y3">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">槍頭擊中API測試</p>
        </div>
        <div class="card-content">
          <div class="content">
            content:{{ content }} <br />
            api:{{ api }} <br />
            api參數:{{ api_val }} <br />
            api方法:{{ api_type }} <br />
            <br />
            <br />
            <b-field label="輸入設備編號" style="width: 25%; margin-left: 38%">
              <b-input v-model="equipmentid"></b-input>
            </b-field>
          </div>
        </div>

        <footer class="card-footer" style="align-self: center">
          <b-button @click="SetWisdomGunhead()" type="is-info is-light">
            <b-icon
              pack="fas"
              icon="magic"
              size="is-medium"
              style="display: inline-block"
              type="is-success"
            ></b-icon>
            <span style="margin-left: 5px; display: inline-block"
              >送出測試資料</span
            ></b-button
          >
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
  data() {
    const data = [
      { sessionname: "C-2場次", judge_account: "裁判6", equipmentid: "BE001" },
    ];
    return {
      data,
      db_api: this.GLOBAL.ApiUrl,
      test: false,
      equipmentid: "",
      title: "槍頭擊中API",
      status: "已完成",
      content: "槍頭擊中API",
      api: "",
      api_val: "",
      api_type: "Post",
      EquipmentidList: [],
      selected: data[0],
      columns: [
        {
          field: "sessionname",
          label: "場次",
        },
        {
          field: "judge_account",
          label: "裁判",
        },
        {
          field: "equipmentid",
          label: "機器編號",
        },
      ],
      projects: [
        {
          title: "槍頭擊中API",
          status: "已完成",
          content: "槍頭擊中API",
          api: "",
          api_val: "",
          api_type: "Post",
        },
      ],
    };
  },

  async mounted() {
    this.GetEquipmentidList();
  },
  methods: {
    //取得目前有的編號
    GetEquipmentidList() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Pikegame/Sessiondetial/GetEquipmentidList",
          JSON.stringify(this.Paccountid)
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.EquipmentidList = response.data.Data.slice();

            //window.location.reload();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
    //擊中槍頭
    SetWisdomGunhead() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Pikegame/Sessiondetial/SetWisdomGunhead",
          JSON.stringify(this.equipmentid)
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            Swal.fire("已送出!", `請至該裁判帳號輸入比分!`, "success");
            //this.reload();
            //window.location.reload();
          } else {
            this.error = response.data.Message;
          }
        })
        .catch((error) => console.log(error));
    },
  },
  watch: {
    selected: {
      handler: function () {
        this.equipmentid=this.selected.equipmentid;
        
      },
    },
  },
};
</script>