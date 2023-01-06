
  <template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ path: '/Home' }">首頁</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>       
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/Accountm' }">帳號管理</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/CarouselView' }">輪播廣告設定</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/WisdomGunhead' }">API功能測試</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--  <b-nav-form>          
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> 
        </b-nav-form> -->
          <!--  <div class="user">
            <div class="name">
              <a title="profile">{{username}}</a>
            </div>           
           
          </div>
         <div class="name">
              <a title="profile">{{name}}</a>
            </div> -->

          <b-nav-form>
            <!-- <b-nav-item style="color:black!important">  <b-icon
                pack="fas"
                icon="user"
                size="is-large"
                type="is-success">
            </b-icon></b-nav-item> -->
            <b-nav-item :to="{ path: '/' }">輪播頁|</b-nav-item>          
            <b-nav-item> {{ username }}</b-nav-item>
            <b-nav-item @click="logout">登出</b-nav-item>
          </b-nav-form>

          <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
         
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
         </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
  
  <script>
import Swal from "sweetalert2";
export default {
  // name: 'Navbar',
  // props: {
  //   msg: String
  // },
  props: ["username"],
  data() {
    return {
      name: null,
      level: null,
      isLogin: "no",
    };
  },
  methods: {
    logout() {
      // window.location.reload();

      Swal.fire({
        // position: 'top-end',
        icon: "info",
        title: "您正在登出",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        sessionStorage.clear();
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>
<style scoped>
.bg-info{
  background-color: #487981!important;
  /* background-image: url("../../src/assets/bg10.jpg"); */
}
</style>
