<template>
  <div>
    <div>{{title}}</div>
    <input type="text" v-model="name">
  </div>
</template>

<script>
export default {
  name:'w-input',
  props:{
    title:{
      type:String,
      default:''
    }
  },
  data(){
    return {
      name:'',
    }
  }
}
</script>

<style>

</style>