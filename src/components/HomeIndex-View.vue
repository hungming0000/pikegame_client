<template>
  <div class="homeindex-view">
    <header style="background-color: #87b4dec2;">
      <!-- <nav>
    <div class="main-nav">
      <ul class="text-center">
        <li><a class="smoothScroll" href="#/Login">
          
              <b-icon
                pack="fas"
                icon="dollar-sign"
                size="is-medium"
                style="display: inline-block"                
              ></b-icon>
            </a></li> 
        <li><a class="smoothScroll" href="#/Login">        
              <font-awesome-icon :icon="['fas', 'user']"  />
            </a></li>        
      </ul>
    </div>
  </nav> -->
      <span class="titlest">大槍比賽裁判判分管理系統</span>
      <nav role="navigation">
        <ul class="vertical-list">
          <li>
            <a href="#Price"
              ><b-icon
                pack="fas"
                icon="dollar-sign"
                size="is-medium"
                style="display: inline-block"
              ></b-icon
              >Price |</a
            >
          </li>
          <li>
            <a href="#about"
              ><b-icon
                pack="fas"
                icon="phone"
                size="is-medium"
                style="display: inline-block"
              ></b-icon
              >About Me |</a
            >
          </li>
          <li>
            <a href="#/MatchScore">
              <b-icon
                pack="fas"
                icon="star"
                size="is-medium"
                style="display: inline-block"
              ></b-icon
              >Live Score</a
            >
          </li>
          <li>
            <a href="#/Login">
              <b-icon
                pack="fas"
                icon="table"
                size="is-medium"
                style="display: inline-block"
              ></b-icon
              >Score Table</a
            >
          </li>
        </ul>
      </nav>
    </header>
    <Marquee></Marquee>
    <Highlight></Highlight>
    <Advertise></Advertise>
  </div>
</template>
  <script>
import Marquee from "./views/Marquee-View.vue";
import Highlight from "./views/Highlight-View.vue";
import Advertise from "./views/Advertise-View.vue";

export default {
  name: "homeindex-view",
  components: {
    Marquee,
    Highlight,
    Advertise,
  },
  created() {
    this.$emit("publuc_header", false);
  },
};
</script>
  
<style scoped>
.homeindex-view{

  background-image: url("../../src/assets/bg6.jpg");
}
.vertical-list{
  background-color: rgba(28, 29, 23, 0.6);
  border-radius: 6px;
}

.titlest {
  /* background-color: #87b4dec2; */
  color: white;
  font-weight: bold;
  font-size: x-large;
}
nav {
  z-index: 1;
  position: fixed;
  right: 0;
}

i {
  color: #fff;
}

ul {
  list-style: none;
  padding: 0;
  /*reset margin*/
  margin: 0;
}

li {
  display: inline-block;
  font-family: "Titillium Web", sans-serif;
  font-size: 1.2em;
}

li:hover .fa-home {
  color: #00ffff;
}

li:hover .fa-quote-right {
  color: #00ff7f;
}

li:hover .fa-code {
  color: #ffdd00;
}

li:hover .fa-send {
  color: #ff00ff;
}

li:hover .fa-share-alt {
  color: #ff4500;
}

a {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  padding: 8px;
}

a:hover {
  color: #337ab7;
}

a:hover i {
  color: #337ab7;
}

/* id's */

/* main nav */

.main-nav {
  text-align: right;
  padding: 0;
  width: 50px;
  float: right;
  background-color: rgba(125, 125, 125, 0.2);
  border-radius: 0px 0px 0px 10px;
}

.main-nav ul {
  float: right;
}
/* classes */

.text-center {
  text-align: center;
}
</style>
