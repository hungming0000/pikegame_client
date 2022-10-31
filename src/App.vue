<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <HeaderView />
    </div>
    <router-view></router-view>
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
    };
  },
  components: {
    HeaderView,
  },
  methods: {
    // reload() {
    //   this.isRouterAlive = false;
    //   this.$nextTick(() => {
    //     this.isRouterAlive = true;
    //   });
    // },
  },
};
</script>
<style>
a .icon-text {
  padding: 0px !important;
}
a span {
  height: 0px;
}
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
