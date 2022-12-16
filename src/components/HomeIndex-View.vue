<template>
  <div class="homeindex-view">
  <header>
  <nav>
    <div class="main-nav">
      <ul class="text-center">
        <li><a class="smoothScroll" href="#/Login">
           <!-- <b-icon
                pack="fas"
                icon="user"
                size="is-medium"
                style="display: inline-block"
                
              ></b-icon> -->
              <font-awesome-icon :icon="['fas', 'user']"  />
            </a></li>        
      </ul>
    </div>
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
  
<style>
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
  font-family: 'Titillium Web', sans-serif;
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
/* responsive */

/* @media only screen and (max-width: 480px) {
  h1 {
    font-size: 6em;
  }
  li {
    display: list-item;
  }
  #contact article li {
    display: inline-block;
  }
  .left {
    display: block;
    width: 100%;
  }
  .right {
    display: block;
    width: 100%;
  }
} */
</style>
