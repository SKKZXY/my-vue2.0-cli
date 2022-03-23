<template>
  <div class="about">
    <div>页面</div>
    <div @click="tz">tiaozhuan</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted(){
    console.log('abount')
  },
  methods:{
    tz(){
      this.$router.push({path:'/handlescroll'})
    }
  }
}
</script>


<style lang="scss" scoped>
  .about{
    font-size: 0.5rem;
  }
</style>