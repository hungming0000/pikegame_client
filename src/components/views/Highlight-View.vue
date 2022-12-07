<template>
    <div class="highlight-banner">
        <div class="container h-100">
            <div class="row p-6 h-100 justify-content-center align-items-center">
           <!--banner畫面-->
            <div class="col-sm-12 col-md-12 ">
                <h3>Latest News</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button @click="gonews" class="btn custom-btn btn-outline-primary mr-4">
                  More News
                </button>

            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "highlight-banner",
  props: {
    msg: String
  },
  methods:{
    gonews(){
      this.$router.replace('news');
    },
  }
};
</script>

<style >
  .highlight-banner{
    padding-top: 7rem;
    width: 100%;
    min-height: 568px;
    text-align: left;
    background-color: burlywood;
  }
</style>