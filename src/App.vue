<template>
  <div id="app">
    <div v-if="header_show">
      <HeaderView :username="paccountname"/>
    </div>
    <router-view v-on:publuc_header="publuc_header"></router-view>
  </div>
</template>
<script>
import HeaderView from "./components/Header-View.vue";
export default {
  name: "App",
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  data() {
    return {
      isRouterAlive: true,
      //判斷header
      header_show:true,
      paccountname:'',
    };
  },
  components: {
    HeaderView,
  },
  methods: {
    //是否顯示header
    publuc_header:function(bool){
      this.header_show=bool;
    }

    // reload() {
    //   this.isRouterAlive = false;
    //   this.$nextTick(() => {
    //     this.isRouterAlive = true;
    //   });
    // },
  },
  created() {
    this.paccountname= sessionStorage.getItem("accountname");

  },
  watch: {
   $route(to, from) {    
     if (from.name === "Login" && to.name === "Home") {
       // 在这里刷新
       this.$router.go(0);
     }
   },
 },
};
</script>
<style>
a .icon-text {
  padding: 0px !important;
}
/* a span {
  height: 0px;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
