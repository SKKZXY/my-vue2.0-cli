<template>
  <div class="home">
    <div class="banner">首页</div>
    <div>{{order}}</div>
    <div @click="btn">点击</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      order:{
        id:1
      }
    };
  },
  mounted() {
    console.log("Home.vue-process", process.env);
    window.document.documentElement.setAttribute('data-theme', 'theme2');
  },
  methods:{
    btn(){
      this.$router.push({path:'/about'})
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/style/_theme.scss';
  .home{
    .banner{
      @include theme()
    }
  }
</style>
