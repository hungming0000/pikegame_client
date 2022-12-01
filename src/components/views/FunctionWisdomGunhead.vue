
  <template>
    <div id="cardtable" class="container">
      <section>
      
       
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
                <section> 
            <b-field style="width:50%;margin-left: 25%">
              <b-select
                placeholder="請選擇比賽"
                v-model="tournamentid"                
                required
                expanded
              >
                <option
                  v-for="item in TournamentSelectList"
                  :value="item.tournamentid"
                  :key="item.tournamentid"
                >
                  {{ item.tournamentname }}
                </option>
              </b-select>
            </b-field>     
            <b-field style="width:50%;margin-left: 25%">
              <b-select
                placeholder="請選擇場次"
                v-model="sessionid"                
                required
                expanded
              >
                <option
                  v-for="item in SessionSelectList"
                  :value="item.sessionid"
                  :key="item.sessionid"
                >
                  {{ item.sessionname }}
                </option>
              </b-select>
            </b-field>     

            <b-field style="width:50%;margin-left: 25%">
              <b-select
                placeholder="請選擇場次"
                v-model="team"                
                required
                expanded
              >
              <option value="Blue">藍方</option>
              <option value="Red">紅方</option>
              </b-select>
            </b-field>   
        </section>
        <br /><br />
              content:{{ content }} <br />
              api:{{ api }} <br />
              api參數:{{ api_val }} <br />
              api方法:{{ api_type }} <br />
              <br />
              <br />             
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
        api_val: "[sessionid]:場次ID [redhit]:紅方擊中 [bluehit]:藍方擊中",
        api_type: "Post",
        EquipmentidList: [],
        TournamentSelectList: [],
        SessionSelectList: [],
        tournamentid:null,
        sessionid:null,    
        team    :null,    
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
        this.GetTournamentSelect();
    },
    methods: {     
      //比賽下拉
      GetTournamentSelect() {
        const url = this.GLOBAL.ApiUrl;
        axios
          .post(
            url + "/Pikegame/WinFormPost/GetTournamentSelect",{}           
          )
          .then((response) => {
            this.loading = false;
            if (response.data.isSuccess == true) {
              this.TournamentSelectList = response.data.Data.slice();  
              
            } else {
              this.error = response.data.Message;
            }
          })
          .catch((error) => console.log(error));
      },
      //場次下拉
      GetSessionSelect() {
        const url = this.GLOBAL.ApiUrl;
        axios
          .post(
            url + "/Pikegame/WinFormPost/GetSessionSelect",
            JSON.stringify(this.tournamentid)
          )
          .then((response) => {
            this.loading = false;
            if (response.data.isSuccess == true) {
              this.SessionSelectList = response.data.Data.slice();  
              
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
            url + "/Pikegame/WinFormPost/SetWisdomGunhead",
            {
                sessionid:this.sessionid,
                redhit:this.redhit,
                bluehit:this.bluehit
            }
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
      tournamentid: {
        handler: function () {
          this.GetSessionSelect();
          
        },
      },
      team: {
        handler: function () {
            switch (this.team) {
          case 'Red': //比賽制定者
            this.redhit = true;
            this.bluehit =false;
            break;
          case 'Blue': //裁判
            this.redhit = false;
            this.bluehit =true;
            break;          
        }
          
        },
      },
    },
  };
  </script>