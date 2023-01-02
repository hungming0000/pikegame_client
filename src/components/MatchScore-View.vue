<template>
  <div class="container row">
    <!-- code here -->
    <div class="match col-sm-12 col-md-12">
      <div>
        <section>
          <b-field style="width: 50%; margin-left: 25%; margin-top: 20px">
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
          <b-field style="width: 50%; margin-left: 25%">
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
        </section>
      </div>
      <div class="match-header">
        <!-- <div class="match-status">Live</div> -->

        <div class="match-tournament"></div>
      </div>
      <div class="match-content">
        <div class="column">
          <div class="team team--home">
            <div class="team-logo">
              <img src="../../src/assets/Bluecircle.png" />
            </div>
            <h2 class="team-name">{{ blue_account }}</h2>
          </div>
        </div>
        <div class="column">
          <div class="match-details">
            <div class="match-date">
              <strong>{{ formatDate(sessiontime) }}</strong>
            </div>
            <div class="match-score">
              <span class="match-score-number match-score-number--leading">{{
                bluefraction_sum
              }}</span>
              <span class="match-score-divider">:</span>
              <span class="match-score-number">{{ redfraction_sum }}</span>
            </div>
            <div class="match-time-lapsed"></div>
            <div class="match-bet-options"></div>
          </div>
        </div>
        <div class="column">
          <div class="team team--away">
            <div class="team-logo">
              <img src="../../src/assets/Redcircle.png" />
            </div>
            <h2 class="team-name">{{ red_account }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      TournamentSelectList: [],
      SessionSelectList: [],
      SessionScoreList: [],
      tournamentid: null,
      sessionid: null,
      red_account: "",
      blue_account: "",
      redfraction_sum: 0,
      bluefraction_sum: 0,
      sessiontime: "",
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
        .post(url + "/Pikegame/WinFormPost/GetTournamentSelect", {})
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
    //場次資訊
    GetSessionScoreById() {
      const url = this.GLOBAL.ApiUrl;
      axios
        .post(
          url + "/Pikegame/MatchScore/GetSessionScoreById",
          JSON.stringify(this.sessionid)
        )
        .then((response) => {
          this.loading = false;
          if (response.data.isSuccess == true) {
            this.SessionScoreList = response.data.Data.slice();
            this.blue_account = response.data.Data[0].blue_account;
            this.red_account = response.data.Data[0].red_account;
            this.bluefraction_sum = response.data.Data[0].bluefraction_sum;
            this.redfraction_sum = response.data.Data[0].redfraction_sum;
            this.sessiontime = response.data.Data[0].sessiontime;
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
  },
  watch: {
    tournamentid: {
      handler: function () {
        this.GetSessionSelect();
      },
    },
    sessionid() {
      this.GetSessionScoreById();
    },
  },
};
</script>

<style scoped>
button,
input,
select,
textarea {
  font: inherit;
}
img {
  display: block;
}
strong {
  font-weight: 600;
}
body {
  font-family: "Inter", sans-serif;
  line-height: 1.5;
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
}
.match {
  background-color: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  /* min-width: 600px; */
  min-width: 1300px;
  min-height: 750px;
  border-radius: 10px;
  box-shadow: 0 0 2px 0 rgba(48, 48, 48, 0.1), 0 4px 4px 0 rgba(48, 48, 48, 0.1);
}
.match-header {
  display: flex;
  border-bottom: 2px solid rgba(48, 48, 48, 0.1);
  padding: 16px;
}
.match-status {
  background-color: var(--color-bg-alert);
  color: var(--color-text-alert);
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  line-height: 1;
  margin-right: auto;
}
.match-status:before {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  background-color: currentColor;
  border-radius: 50%;
  margin-right: 8px;
}
.match-tournament {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.match-tournament img {
  width: 20px;
  margin-right: 12px;
}
.match-actions {
  display: flex;
  margin-left: auto;
}
.btn-icon {
  border: 0;
  background-color: transparent;
  color: var(--color-text-icon);
  display: flex;
  align-items: center;
  justify-content: center;
}
.match-content {
  display: flex;
  position: relative;
  min-height: 650px;
}
.column {
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3);
}
.team {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.team-logo {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-bg-primary);
  box-shadow: 0 4px 4px 0 rgba(48, 48, 48, 0.15),
    0 0 0 15px var(--color-bg-secondary);
}
.team-logo img {
  width: 50px;
}
.team-name {
  text-align: center;
  margin-top: 24px;
  font-size: 20px;
  font-weight: 600;
}
.match-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.match-date,
.match-referee {
  font-size: 14px;
  color: var(--color-text-secondary);
}
.match-date strong,
.match-referee strong {
  color: var(--color-text-primary);
}
.match-score {
  margin-top: 12px;
  display: flex;
  align-items: center;
}
.match-score-number {
  font-size: 48px;
  font-weight: 600;
  line-height: 1;
}
.match-score-number--leading {
  color: var(--color-theme-primary);
}
.match-score-divider {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text-icon);
  margin-left: 10px;
  margin-right: 10px;
}
.match-time-lapsed {
  color: #df9443;
  font-size: 14px;
  font-weight: 600;
  margin-top: 8px;
}
.match-referee {
  margin-top: 12px;
}
.match-bet-options {
  display: flex;
  margin-top: 8px;
  padding-bottom: 12px;
}
.match-bet-option {
  margin-left: 4px;
  margin-right: 4px;
  border: 1px solid var(--color-text-icon);
  background-color: #f9f9f9;
  border-radius: 2px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
}
.match-bet-place {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  border: 0;
  background-color: var(--color-theme-primary);
  border-radius: 6px;
  padding: 10px 48px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  box-shadow: 0 4px 8px 0 rgba(48, 48, 48, 0.25);
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>